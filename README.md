# MyHistoryProject

* [小蜜蜂](UnityGames/LittleBee/README.md)<br/>
* [小精靈](UnityGames/Pacman/README.md)<br/>
* [炸彈超人](UnityGames/Bombman/README.md)<br/>
* [UnrealProject](#UnrealProject)<br/>
* [Labview](#Labview)<br/>
* [Project](#Project)<br/>


<div id = "UnrealProject" ></div>

Unreal Project
===================


### 1.UI

#### BagUI
![Image](https://s22.postimg.org/pmlltbx35/Bag_UI.png)

* 顯示目前金錢
* 點選物品2下可使用
* 拖曳物品置背包外可丟下
* 點選箭頭可換頁

#### ShopUI
![Image](https://s28.postimg.org/gdhvh9a6l/Shop_UI.png)

* 顯示目前金錢
* 點選物品2下會跳出視窗選擇數量，進行買賣

#### Map
![Image](https://s1.postimg.org/me08oleen/Land_Scape.png)

* 這是目前的地圖

### 2.功能

#### 釣魚
![Image](https://s2.postimg.org/n1p2ylsix/Fishing.png)

* 按住左鍵可集氣
* 當魚餌碰到地面時可按住右鍵拉回
* 當魚餌碰到魚時，就會勾住魚
* 當魚靠近主角附近時就算釣到

#### 農場
![Image](https://s17.postimg.org/9kdiiqxjj/Farm.png)

* 當靠近泥土時，可開背包點兩下種子即可種植
* 植物會逐漸長大，成熟時會有星星的特效
* 成熟時按G鍵即可獲得


### 3.動畫

#### 牛
![Image](https://s13.postimg.org/g9tm56oyf/Cow.png)

* 行走動畫
* 靠近野草時會開始吃草的動畫

#### 人物

* 行走動畫
* 按兩下W鍵可進行跑步
* 當手中有釣竿時按左鍵可進行釣魚


LabView
===================

## BattleShip
![Image](https://s10.postimg.org/5a0lhj1q1/Labview.png)

這是一款在比賽前先設定好自己方船的位子跟種類，然後在連線之後去猜測對方的船隻所在，先擊毀對方全部船艦的就獲勝。
而這連線的部分是用Labview裡面的Datasocket。

Project
===================
![Image](https://s23.postimg.org/n5w1kryyj/Project.png)

* 前端 : Html
* 後端 : NodeJs
* 接收GateWay資料 : Python
* 資料庫 : MySql

這個專題是在做校狗追蹤，把GPS和LoRa modula裝戴在校狗身上，LoRa定時傳送資料到Gate Way上，然後再用python把資料從他們公司的資料庫把資料抓下來放到我們自己的mysql資料庫裡</br>
前端的部分就是根據選項所選發送request到後端，然後在接收後端也就是mysql的資料，接著顯示到google map上




