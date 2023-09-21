# 개요

드래그 앤 드랍 드래그 앤 드랍!!
말로만 들었던 그 기능... 단순히 말로만 들었지 직접 구현해보지는 않았다.

바닐라 자바스크립트는 물론 리액트 프로젝틀르 진행하는 도중에도 해당 기능을 만든 적이 없었다.

구글에 검색하면 많이들 나오는 기능이지만 직접 나 혼자 생각해 만들어 볼 예정이다.

# 드래그 앤 드랍이 뭔데?

흔히 아는 그 기능 맞다.
![제목 없는 디자인](https://github.com/junheeLee96/dragdrop/assets/89452058/d5dd4b24-9aef-4c72-9888-c5ba728add24)
<br/>
이미지나 동영상 등의 파일객체를 웹에 업로드하는데 훨씬 간편하고 빠른 기능이다.  
<br/>
나는 이 기능을 파일 업로드 말고 div를 드래그 앤 드랍하는 기능으로 만들고 싶다.
<br/>

# 일단 대충 만들어봤다.

<img width="1565" alt="스크린샷 2023-09-20 오후 10 16 11" src="https://github.com/junheeLee96/dragdrop/assets/89452058/964df790-d557-47c0-b9c5-d7bed554bc86">
왼쪽에 있는 사진+글의 조합을 오른쪽으로 옮기고 싶다..

# 첫번째 도전

<br/>
예로부터 모든 이벤트는 이벤트 리스너로부터 시작한다 하였다...
그것이 바닐라 자바스크립트든 리액트든간에..

그래서 시도해봤다.

<br/>

<img width="573" alt="스크린샷 2023-09-20 오후 10 27 40" src="https://github.com/junheeLee96/dragdrop/assets/89452058/938899b8-633c-41e5-af68-e1f29573bf63">

<br/>

짜잔...
그런데 문제점... 클릭 이벤트는 마우스를 눌렀다 떼는 순간 발생한다. 즉 쭉 누르고 있어야만 하는 드래그엔 적합하지 않다.

<br/>

# 두 번째 도전...

<br/>
클릭 이벤트가 마우스를 떼는 순간 발생한다면... 그럼 누를때 발생시키면 되지 않을까?
<br/>
<br/>
<img width="345" alt="스크린샷 2023-09-20 오후 10 36 28" src="https://github.com/junheeLee96/dragdrop/assets/89452058/7f80bfe6-7ba7-4219-b2b4-fb8cd30717b9">

<br/>
일단은 이벤트를 잘 받긴한다. 문제는 잘 받기만 한다는 거

![제목 없는 디자인 (1)](https://github.com/junheeLee96/dragdrop/assets/89452058/9d81c9d9-be62-4f1c-a734-8040cbd3c9d5)

<br/>
클릭한 순간 이벤트가 발생되지만 드래그를 하면 div 객체가 딸려오는 것이 아니게 된다..

<br/>

# 세번째 도전...

<br/>

그렇다면 이벤트의 종류를 한 번 살펴보자.
onClick, onAbort, onAnimationStart, onChange....
<br/>
그러던 중 발견한 onDrag...!
<br/>
동작을 하지 않았던 또는 예상과 다르게 동작했던 이벤트들과 비슷하게 onDrag이벤트도 동작하지 않았다.
<br/>
그러나 onDrag는 무언가 달랐다.
<br/>
느낌이가 와버렸다. 이 녀석이 바로 내가 찾던 그 기능이라고..

<br/>

<br/>

# 그런데 Why...

<br/>
왜 동작하지 않는 걸까
<br/>
MDN을 살펴보자<br/>

<img width="843" alt="스크린샷 2023-09-21 오후 10 11 07" src="https://github.com/junheeLee96/dragdrop/assets/89452058/6bb08db0-f3a9-4875-8ffa-2782807b6f3e">

<br/>

중요한 부분은 "draggable"
<br/>

바로 시도해보자.

<br/>
<img width="444" alt="스크린샷 2023-09-21 오후 10 16 19" src="https://github.com/junheeLee96/dragdrop/assets/89452058/df9a5abc-f134-4b81-afa5-293082d40c41">

<br/>

![제목 없는 디자인 (2)](https://github.com/junheeLee96/dragdrop/assets/89452058/797e30bd-0dfb-4fcb-925d-3c0aa1f8e5e2)

<br/>
오예!!

<br/>

자 이제 왼쪽박스에서 오른쪽 박스로 드래그를 하면 왼쪽박스로 엘리먼트가 이동하는 것을 구현해보자. <br/>

```

  const onDragEnd = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    console.log(e);
    console.log("dragEnd!!");

    const { clientX } = e;
    const { clientY } = e;
    //현재 위치를 구하고

    if (
      leftDivPosition.left <= clientX &&
      clientX <= leftDivPosition.right &&
      leftDivPosition.top <= clientY &&
      clientY <= leftDivPosition.bottom
    ) {
      //마우스를 놓았을때 leftBox 영역에 잇으면,
      const arr = [...rightValues];
      //rightValues에서 idx번째를 빼내서
      const removedItem = arr.splice(idx, 1);

      setLeftValues((p) => {
        return [...p, ...removedItem];
      }); //빼낸 값을 leftValues에 넣고
      setRightValues(arr);
      //빼낸 나머지 값을 right에 넣는다.
    } else if (
      //오른쪽 박스 영역이라면
      rightDivPosition.left <= clientX &&
      clientX <= rightDivPosition.right &&
      rightDivPosition.top <= clientY &&
      clientY <= rightDivPosition.bottom
    ) {
      const arr = [...leftValues];
      const removedItem = arr.splice(idx, 1);
      setRightValues((p) => [...p, ...removedItem]);
      setLeftValues(arr);
    }
  };


```

<br/>
드래그가 끝나면, 끝난 시점의 마우스 위치값을 구하고,<br/>
마우스의 위치가 어느 박스에 속해있는지 판단한 다음 값을 다른 곳으로 옮기면 끝난다.
<br/>
하지만 또 문제점이 발생했다.
<br/>

https://github.com/junheeLee96/dragdrop/assets/89452058/00b549d2-5bdd-44ed-8fca-3df778325754

바로 한박자씩 느리게 흘러간다는 문제점이다.

<br/>

onDragEnd가 마우스를 떼고 얼마간의 시간이 지난 후 동작하는 것으로 보아 onDrag에 해당 로직을 넣으면 되지 않을까...?
<br/>하는 꿈을 잠시 꿨습니다...

https://github.com/junheeLee96/dragdrop/assets/89452058/c053352b-da86-4dbb-a19f-7054b2f5f836

<br/>
결과는 참담했다.
onDrag에 해당 로직을 넣는건 취소...
<br/>
<br/>
드래그가 끝나는 시점에 값을 넣고 빼는 동작을 실행시켜야하는 것에는 틀림이없다.
<br/>
그람 아땋게 마우스를 떼는 순간 값을 넣고 뺄 수가 있을까<br/>

<!-- 가장 최상위 조건은 마우스를 떼는 순간 onDragEnd가 실행되는 것이다.
<br/>
onDragEnd가 실행되는 시점을 살펴보자.
<br/>
드래그를 하는 순간, 그림자(?)또는 복제본이 따라온다.
<br/>
마우스를 떼고, 그 복제본이 다시 원래 자리로 돌아간 이후에 onDragEnd가 동작하는 걸까?

<br/><br/>

 -->

 <br/>
 이 방법 저 방법을 찾다가 MDN을 천천히 쭉 보게되었다.<br/>
 그러다 발견한 onDragOver!!<br/>

https://github.com/junheeLee96/dragdrop/assets/89452058/e2d5582b-ab29-4b3f-a494-44618363f542

<br/>
MDN에서 내가 찾고자하는 예제랑 딱 들어맞았다.

<br/>

```
 onDragOver={(e) => e.preventDefault()}
```

을 바로 사용해보았다.

<br/>

<br/>

https://github.com/junheeLee96/dragdrop/assets/89452058/a1f2f9c4-0d66-4b8e-aa86-24d7e994e246

<br/>

너무 잘된다...

구글링을 하지않고(MDN은...제외...) 처음 시도한 드래그 앤 드롭..
<br/>
드래그 앤 드롭을 직접 구현하는데 걸린 시간은 약 3시간 정도 걸린 것 같다.
<br/>
기능만 본다면 어려워보이지만, 실제로 구현해보니 그렇게 어려운 것은 없었다.
