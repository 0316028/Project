
炸彈超人
===================

### 1.遊戲畫面
#### 設定操作
<img src="https://s26.postimg.org/uakcczzu1/Key_Set.png" width="500">

#### 遊戲畫面
<img src="https://s26.postimg.org/6xmauhjqh/Bombman_Game.png" width="500">

### 2.架構:

* MVC架構:
<img src="https://s26.postimg.org/4sto4o17t/MVCModel.png" width="500">

* 物件架構:
<img src="https://s26.postimg.org/5jmeag3l5/Object.png" width="500">

* 程式流程:
<img src="https://s26.postimg.org/z020cv9yh/Flow.png" width="500">

### 3.地圖系統:
* 依Node為單位作為物件所在的依據，所有的物件都是在Node之間做移動。

### 3.碰撞偵測:

* 

### 4.設計模式:

* 1.`物件池(ObjectPool)`:基本上我場面上所有的遊戲物件都是同一個物件所產生，只是裡面的參數不同，所以當要回收再利用時，只需要改變其中的值就可以。
* 2.`享元(Flyweight Pattern)`:我把`Controller`(控制)、`Action`(碰撞所發生的事件)，Function化，讓他一開始就產生實體，而物件只需要把自己當作參數帶入這兩個Model的Function內，就可得到相對應的效果。



