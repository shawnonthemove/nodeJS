# <font color="#0d6">***nodeJS***</font> 学习笔记

## ***charpter one: process 模块***

***进程*** 是计算机中的程序关于某数据集合上的一次运行活动，进程是线程的容器，我们启动一个服务，运行一个实例，就是开一个服务进程。  

***线程*** 是操作系统能够进行运算调度的最小单位，其隶属于进程。同一块代码，可以根据cpu核心数启动多个进程，每个进程都有属于自己的独立运行空间，进程之间互不影响。同一进程中的多条线程将共享该进程中的全部系统资源，如虚拟地址空间，文件描述符和信号处理等。但是同一进程中的多个线程都各自拥有调用栈（<font face='fantasy'>call stack</font>），自己的寄存器环境（<font face='fantasy'>register context</font>）以及线程本地存储（<font face='fantasy'>thread-local storage</font>）。
> nodeJS 源于 javascript，是单线程模型，但是基于其事件系统，异步非阻塞模式，可以应用于高并发场景，同时也避免了线程创建，线程之间上下文切换所带来的资源开销。

***nodeJS中的线程与进程***  
*nodeJS* 是 javascript 在服务器的运行环境，构建在 chrome 的 V8 引擎之上。一般在单核 CPU 系统之上我们可以采用 单进程 + 单线程 的模式进行开发；而在多核 CPU 系统上，可以使用 fork 方法开启多个进程（nodeJS 在 v0.8 版本之后新增了 Cluster 来实现多进程架构），采用 多进程 + 单线程 的模式。<font color="#f0f">**开启多线程并不是为了解决高并发，主要是解决了单进程模式下 nodeJS CPU 利用率不足的情况，可以充分利用多核CPU的性能。**</font>  

***进程创建***  
*nodeJS* 提供了 child_process 内置模块，用于创建子进程。

## ***charpter two: net 模块***

做一个简单的 Web API 需要搭建一个 Web 服务器，在 ASP.NET 中需要 IIS 来搭建服务器，PHP 中需要借助 Apache/Nginx 来实现。但是在 Node.js 中开启一个 Web 服务器是比较简单的，我们利用 Net、Dgram、HTTP、HTTPS 等模块通过几行简单的代码就可实现。而 Net 模块和 Dgram 模块是基于传输协议实现的，分别对应 TCP 和 UDP 协议。

***TCP 传输协议***  
TCP 协议的特点主要有三个：  

- <font color="#63f">***面向链接***</font>：需要对方主机在线，建立链接；
- <font color="#63f">***面向字节流***</font>：以二进制数据发送，分段发送，数据量可设置，每段数据会有一个序号，这个序号就是发送的这段字节中编号最小的子界的编号；
- <font color="#63f">***可靠***</font>：保证数据有序地到达对方主机，每发送一个数据就会得到对方的回复，如果在指定时间内收到了对方的回复，就确认数据到达，如果超过了一定时间没有得到回复，会触发重传机制。

***Net模块创建TCP服务实例***
创建一个 TCP 服务端与客户端的链接实例可以使用 nodeJS 的 Net 模块，它提供了一些用于底层通信的接口，该模块可以用于创建基于流的 TCP 或 IPC 的服务器（`net.createServer()`）与客户端（`net.createConnection()`）。

```javascript
console.log()
```

水果名称|价格|数量  
-|-|-
香蕉 | $1 | 5 |
苹果 | $1 | 6 |
草莓 | $1 | 7 |
