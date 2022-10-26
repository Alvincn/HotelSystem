# 技术栈

前端：html+js+vue+axios（AJAX请求）+elementui(ui库)

后端：node.js,express

# 登录注册

## 登录

这块登录前端会给后端传递两个参数，第一个是用户名，第二个是密码，在`router/user.js`文件中。

- 先根据用户名进行查找，因为这里不只会返回一个，有多少个一样的用户名都会返回，所以返回的是一个数组，这里我们只用第一个。
- 由此我们可以看出，当数组的长度为0的时候，说明没查到人（这时就会给前端返回一个查无此人的错误信息，且状态码为2）。
- 如果说，查到了，我们只要数组里第一个数据，判断 前端给我们发过来的密码和数据库中查询到的密码是否相等，相等的话返回登录成功，且状态码为0.
- 如果说密码错误，我们会返回密码错误的错误信息，且状态码为1。
- 用户登录成功后，我们会立即调用`saveuser`接口，来将用户的信息存入到后端的`user.json`中，方便之后使用。

## 注册

注册我们会接受两个参数，一个是用户名，一个是密码，由于我们想的是在之后用户需要进行身份认证，所以我们将`custom`表中其他的数据都设置为可以为空，在身份认证模板中将会对这些数据进行赋值。

根据前端传入的username和password，执行一下操作

- 这里我们直接调用SQL语句，`insert into custom(username,password) values(?,?)`将前端传过来数据进行插入。
- 插入成功，返回状态码 0
- 插入失败，返回状态码 1

# 房间预订

## 获取房间信息

房间这里，每个房间都有一个状态码，也就是表中的`rstate`，判断rstate的值，

- 为0 可以被预订状态，并且用户能看到
- 为1 正在入住状态，用户无法看见
- 为2 停用状态，用户无法看见

当进入首页时，将立即发送给后端一个请求，获取房间信息，后端执行`select * from room where rstate=0`查找出可以被预订状态的房间；。

- 状态码为0，请求成功
- 状态码为1，请求失败
- 请求成功之后将会把可预订状态的全部房间返回。

还会发送一个请求获取用户信息，主要需要判断用户：

- 是否进行登录了，还是直接访问的页面路径并没有进行登录，只需要判断这里的user是否为空，如果为空，说明用户未登录，然后将用户返回到登录页面。
- 判断用户的`authentication`这个属性是否为0，不为0的话无法预订房间

## 搜索房间

`filter`来过滤

按类型：`newarray = array.filter(item=>{return rtype==1})`

按价格：`newarray = array.filter(item=>{return price > 300 && price < 400})`

当点击刷新：`newarray = array`

## 预订房间

前端给后端需要传`rid`这个参数

当我点击这个预订按钮，前端给后端发送请求。

然后我们访问`user.json`将用户的id提取出来，现在我有 cid 和 rid了，还需要什么呢，需要一个starttime，endtime，

start time 直接获取的当前设备的时间。

endtime 获取的是当前设备时间日期加一

orderid 随机生成一个数，

执行`insert into roomorder(orderid,starttime,endtime,cid,rid) values(?,?,?,?,?)`将这些参数都传进去，这个订单就成功啦，立马执行`update room set rstate=1 where rid=?`这句话，修改这个房间的状态为 1，这个房间就不会再出现在用户界面了。

# 订单/我的

## 我的订单

当进入我的订单时，将会立即根据 cid 查询 roomorder 这个表，并且展示出状态码为 0 ，1，2

展示订单：

- 根据`user.json`中的 cid 查找到此 cid 对应的订单，
- 根据查出来的订单中的 rid 在`room`这个表中查出房间的房间的类型，房间的状态，房间图片
- 根据`user.json`中的 cid 查出 `custom`这个表对应的用户信息
- 循环将所有需要的数据插入到一个数组中，返回给前端

对应的状态码：

- 0 ：未入住
- 1： 已入住
- 2： 已退房
- 3： 用户已删除

## 退房

接受一个参数，这个参数就是 orderid，执行一下操作：

- 将 `roomorder`中`orderid`对应的订单中的`state`改为2，
- 将`room`中`rid`对应的房间的`state`改为 0

## 删除

​	接受一个参数，这个参数就是 orderid，执行一下操作：

- 将 `roomorder`中`orderid`对应的订单中的`state`改为3，

## 我的

### 身份认证

接受四个参数：cname，ccardid，cphone，cid

根据cid将`custom`表中的数据进行更新，并且将 authentication 改为0，然后立马将数据都写入到`user.json`中。

## 修改密码

根据 cid 将`custom`中的 password 改成新的密码即可

# 使用流程

首先进行注册，输入用户名，输入密码以及确认密码，确保密码以及确认密码相同，系统显示注册成功，并跳转到登录页面。

输入账号密码进行登录，登陆后进入主页，此时系统提醒未进行身份认证，此时无法进行房间预订。

在我的中点击去认证，进行身份认证，认证后可以预订房间。

点击房间预订后在我的订单中可以查看订单，此时去酒店前台，前台在管理员系统中点击入住，即为办理入住成功。

在我的订单中点击退房，或者在酒店前台，管理员系统进行退房，

用户可以删除订单。

管理员可以查看所有订单，并且删除订单。

管理员可以查看用户，并且对一些恶意预订的用户进行冻结。

管理员可以查看房间状态，新增/修改房间状态。

# 项目展示

登录页面：

![image-20220719144306514](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144306514.png)

注册页面：

![image-20220719144320541](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144320541.png)

注册成功：

![image-20220719144346159](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144346159.png)

登录成功：

![image-20220719144406015](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144406015.png)

身份认证：

![image-20220719144423110](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144423110.png)

预订房间：

![image-20220719144505429](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144505429.png)

查看订单：

![image-20220719144517786](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144517786.png)

管理员登录：

![image-20220719144606323](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144606323.png)

管理员界面：

![image-20220719144623784](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144623784.png)

管理员办理入住：

![image-20220719144656818](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144656818.png)

客户管理：

![image-20220719144723910](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144723910.png)

备份/恢复数据库：

![image-20220719144748866](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719144748866.png)

未登录，无法进入主页：

![image-20220719145042309](C:\Users\chen2\AppData\Roaming\Typora\typora-user-images\image-20220719145042309.png)
