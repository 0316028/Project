# MyHistoryProject

* [Test](UnityGames/LittleBee/README.md)
* [小蜜蜂](#LittleBee)<br/>
* [小精靈](#Pacman)<br/>
* [炸彈超人](#Bombman)<br/>
* [UnrealProject](#UnrealProject)<br/>
* [Labview](#Labview)<br/>
* [Project](#Project)<br/>


<div id = "LittleBee"></div>

小蜜蜂
===================

### 1.遊戲畫面

### 2.架構:

<img src="https://s26.postimg.org/66aoytueh/Little_Bee.png" width="500">

### 3.碰撞偵測:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基本上是依座標做矩形碰撞，如果有重疊即碰撞。

### 4.設計模式:

* 1.`物件池(ObjectPool)`:基本上我場面上所有的遊戲物件都是同一個物件所產生，只是裡面的參數不同，所以當要回收再利用時，只需要改變其中的值就可以。
* 2.`享元(Flyweight Pattern)`:我把`Controller`(控制)、`Action`(碰撞所發生的事件)，Function化，讓他一開始就產生實體，而物件只需要把自己當作參數帶入這兩個Model的Function內，就可得到相對應的效果。

<div id = "Pacman"></div>

小精靈
===================

### 1.遊戲畫面

<img src="https://s26.postimg.org/nlsx0skyx/Pacman_Game.png" width="500">

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

### 5.繪製地圖

* 遊戲中牆壁所在的地圖我是用程式對二為陣列做計算後，把相連的點放入LineRenderer做顯示。
* 我的相連最外圍點的演算法:
1.牆壁資料為0,1的二維陣列，0即為有牆壁，1則無
2.從二維陣列最上面的Row開始掃描，當掃描到1時，對該方向向量做順時針的偵測，找到下一個點後Push到List，並把該點改成0，然後做遞迴直到找不到點。

詳細的演算法:

<img src="https://s26.postimg.org/m0oo5yl9l/Angle_1.png" width="300">

	static int m_iDirectionNumber = 4;
	static float m_fBaseAngle = 90f;
	static float m_fAngleInterval = 90f;
	static float m_fNodeBaseAngle = 0f;
	static int m_iNodeAngleNumber = 4;

	static List<List<int>> ScanMap(){
		List<List<int>> ListResult = new List<List<int>> ();
		//根據周圍點的數量，找出要掃的角度
		m_fAngleInterval = 360/m_iDirectionNumber;
		//掃描整張圖
		int iRowCount = m_ListTempMaps.Count;
		int iColCount = 1;
		for (int i = 0; i < iRowCount; ++i) {
			iColCount = m_ListTempMaps [i].Count;
			for (int j = 0; j < iColCount; ++j) {
				if (m_ListTempMaps [i] [j] == 0) {
					//如果是牆壁進入ScanRegion
					ListResult.Add(ScanRegion (i, j, iRowCount, iColCount));
				}
			}
		}
		//每一條Line有沒有頭尾是相連的，如果有就將兩條合併
		for (int i = 0; i < ListResult.Count; ++i) {
			List<int> iMyList = ListResult [i];
			int iMyStartPoint = iMyList [0];
			int iMyEndPoint = iMyList [iMyList.Count - 1];
			if (iMyStartPoint == iMyEndPoint) {
				continue;
			}
			for (int j = i + 1; j < ListResult.Count; ++j) {
				List<int> iOtherList = ListResult [j];
				int iOtherStartPoint = iOtherList [0];
				int iOtherEndPoint = iOtherList [iOtherList.Count - 1];
				//Debug.Log (iOtherEndPoint);
				if (iOtherStartPoint == iOtherEndPoint) {
					continue;
				}
				int HeadHead = Mathf.Abs (iMyStartPoint - iOtherStartPoint);
				int HeadTail = Mathf.Abs (iMyStartPoint - iOtherEndPoint);
				int TailHead = Mathf.Abs (iMyEndPoint - iOtherStartPoint);
				int TailTail = Mathf.Abs (iMyEndPoint - iOtherEndPoint);
				//結果是1表示是左右相鄰，是iColCount表示是上下相鄰
				if (HeadHead == 1 || HeadHead == iColCount) {
					iOtherList.Reverse ();
					iOtherList.AddRange (iMyList);
					ListResult [i] = iOtherList;
					ListResult.RemoveAt (j);
				} else if (TailTail == 1 || TailTail == iColCount) {
					iOtherList.Reverse ();
					ListResult [i].AddRange (iOtherList);
					ListResult.RemoveAt (j);
				}else if (HeadTail == 1 || HeadTail == iColCount) {
					iOtherList.AddRange (iMyList);
					ListResult [i] = iOtherList;
					ListResult.RemoveAt (j);
				}else if (TailHead == 1 || TailHead == iColCount) {
					ListResult [i].AddRange (iOtherList);
					ListResult.RemoveAt (j);
				}
			}
		}
		return ListResult;
	}
	static List<int> ScanRegion(int _iStartRow,int _iStartCol,int _iRowBound,int _iColBound){
		List<int> iListWalkThroughID = new List<int> ();
		iListWalkThroughID.Add (_iStartRow * _iColBound + _iStartCol);
		m_ListTempMaps [_iStartRow][ _iStartCol] = 1;
		int iXDirection = 1;
		int iYDirection = 0;
		int iBaseRowIndex = _iStartRow;
		int iBaseColIndex = _iStartCol;
		while (true) {
			bool bFindEnd = true;
			bool bFindOrigin = false;
			for (int i = 0; i < m_iDirectionNumber - 1; ++i) {
				//m_fBaseAngle為最接近且小於等於180的角度，也就是為求順時針的起始角度，而順時針所以是用減的
				float fAngle = (float)Math.Round(Mathf.Deg2Rad*((m_fBaseAngle - m_fAngleInterval * i)),3);
				float fSineValue;
				float fCosineValue;
				//把算過的Angle存在Dictionary，有算過的直接用，沒有的再做運算
				if (TableCircular.ContainsKey (fAngle)) {
					Vector2 v2CircularValue = (Vector2)TableCircular [fAngle];
					fCosineValue = v2CircularValue [0];
					fSineValue = v2CircularValue [1];
				} else {
					fSineValue = (float)Math.Round(Mathf.Sin (fAngle),3);
					fCosineValue = (float)Math.Round(Mathf.Cos (fAngle),3);
					TableCircular.Add (fAngle, new Vector2 (fCosineValue, fSineValue));
				}
				//旋轉向量
				float fXValue = iXDirection * fCosineValue +  -1 * iYDirection * fSineValue;
				float fYValue = iXDirection * fSineValue + iYDirection * fCosineValue;
				//把0.... -> 1
				//把-0.... -> -1
				int iNextXDirection = Mathf.CeilToInt (Mathf.Abs (fXValue));
				int iNextYDirection = Mathf.CeilToInt (Mathf.Abs (fYValue));
				if (fXValue < 0f) {
					iNextXDirection = -1 * Mathf.CeilToInt (Mathf.Abs (fXValue));
				}
				if (fYValue < 0f) {
					iNextYDirection = -1 * Mathf.CeilToInt (Mathf.Abs (fYValue));
				}
				//對陣列來說向上是對Row用減的
				int iRowIndex = iBaseRowIndex - iNextYDirection;
				int iColIndex = iBaseColIndex + iNextXDirection;
				//找回起始位子就結束
				if (iRowIndex == _iStartRow && iColIndex == _iStartCol) {
					iListWalkThroughID.Add (iBaseRowIndex * _iColBound + iBaseColIndex);
					iListWalkThroughID.Add (iRowIndex * _iColBound + iColIndex);
					bFindOrigin = true;
					break;
				} else {
					if (iRowIndex >= 0 && iRowIndex < _iRowBound
					   && iColIndex >= 0 && iColIndex < _iColBound
					   && m_ListTempMaps [iRowIndex] [iColIndex] == 0
					){
						//只存下轉折點的座標
						if (iXDirection != iNextXDirection || iYDirection != iNextYDirection) {
							iListWalkThroughID.Add (iBaseRowIndex * _iColBound + iBaseColIndex);
						}
						m_ListTempMaps [iRowIndex] [iColIndex] = 1;
						iXDirection = iNextXDirection;
						iYDirection = iNextYDirection;
						iBaseRowIndex = iRowIndex;
						iBaseColIndex = iColIndex;
						bFindEnd = false;
						break;
					}
				}
			}
			if (bFindEnd) {
				if(!bFindOrigin){
					iListWalkThroughID.Add (iBaseRowIndex * _iColBound + iBaseColIndex);
				}
				break;
			}
		}
		return iListWalkThroughID;
	}

* 範例:

![Image](https://s26.postimg.org/sd8etjdpl/Draw_Result.png)

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




