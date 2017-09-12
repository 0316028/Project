
炸彈超人
===================

### 1.遊戲畫面
#### 設定操作
<img src="https://s26.postimg.org/uakcczzu1/Key_Set.png" width="500">

#### 遊戲畫面
<img src="https://s26.postimg.org/6xmauhjqh/Bombman_Game.png" width="500">

### 2.架構:

<img src="https://s26.postimg.org/sgmlz2jah/Pacman.png" width="500">
### 3.地圖系統:
* 依Node為單位作為物件所在的依據，所有的物件都是在Node之間做移動。
* 在遊戲開始前，把二維陣列的資料用我寫的Unity工具轉換成我們所使用的Node表示法(Ex : 0 1 2 3 4 代表編號0的Node的上下左右分別為編號1 2 3 4的Node)，然後在開始遊戲時把每一關相對應的txt檔匯入成關卡資訊。

### 3.碰撞偵測:

* 在同一個Node上的物件即為有碰撞。
* 會動的物件在到達新的Node時，偵測自己Node的碰撞，因此不需要每個物件都對場面上所有的物件做判斷，只需要對一個Node上的物件做判斷即可，而且也可以省下判斷四邊形有無重疊的計算。

### 4.設計模式:

* 1.`物件池(ObjectPool)`:基本上我場面上所有的遊戲物件都是同一個物件所產生，只是裡面的參數不同，所以當要回收再利用時，只需要改變其中的值就可以。
* 2.`享元(Flyweight Pattern)`:我把`Controller`(控制)、`Action`(碰撞所發生的事件)，Function化，讓他一開始就產生實體，而物件只需要把自己當作參數帶入這兩個Model的Function內，就可得到相對應的效果。



