var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = {
    center: new kakao.maps.LatLng(36.839750443901195, 127.18470111036663), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
    mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
}; 

// 지도를 생성한다 
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 지도에 마커를 생성하고 표시한다
var marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(37.60047527, 126.92047408), // 마커의 좌표
    map: map // 마커를 표시할 지도 객체
});
    
// 지도 타입 변경 컨트롤을 생성한다
var mapTypeControl = new kakao.maps.MapTypeControl();
    
// 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);   
    
// 지도에 확대 축소 컨트롤을 생성한다
var zoomControl = new kakao.maps.ZoomControl();
    
// 지도의 우측에 확대 축소 컨트롤을 추가한다
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    
// 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.');
});   


//인포윈도우를 표시하는 클로저를 만드는 함수입니다.
function makeOverListener(map, marker, infowindow) {
    return function () {
        infowindow.open(map, marker);
    };
}

//인포윈도우를 닫는 클로저를 함수합니다.
function makeOutListener(map, marker, infowindow) {
    return function () {
        infowindow.close(map, marker);
    };
}

function setCenter1() {            
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(36.839750443901195, 127.18470111036663);
    
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}

function panTo1() {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(36.839750443901195, 127.18470111036663);
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
}        

function addList(e){
    let obj = e.currentTarget;
    let obj2 =obj.getAttribute('data-id');
    let obj3 = document.getElementsByTagName("span")[(obj2-1)*3].innerHTML 
    fetch('/getData') // /getTodo 요청
   .then( 
       function (res) {
           if (res.status == 200) {
                // 정상적인 응답
                return res.json(); // 응답을 JSON 형태를 반환               
           }
       }
   )
   .then(
       function (reqData) {
         
        var markers = [];
        var str=reqData.response.body.items.item
        for (let idx in str) {
            lat=str[idx].lat._text
            lng=str[idx].lng._text
            statNm=str[idx].statNm._text

            statId = str[idx].statId._text
            chgerType=str[idx].chgerType._text
            addr=str[idx].addr._text
            useTime=str[idx].useTime._text
            bnm=str[idx].bnm._text
            busiNm=str[idx].busiNm._text
            busiCall=str[idx].busiCall._text
            stat=str[idx].stat ._text
            output=str[idx].output._text
            method=str[idx].method._text
            parkingFree=str[idx].parkingFree._text
            limtYn=str[idx].limitYn._text
            limitDetail=str[idx].limitDetail._text

            if(obj3.search(statId)!=-1)
            {
                var Lat=lat
                var Lng=lng
                var Stat=stat
                var StatNm=statNm
                var StatId=statId
                var ChgerType=chgerType
                var Addr=addr
                var UseTime=useTime
                var Bnm=bnm
                var BusiNm=busiNm
                var BusiCall=busiCall
                var Output=output
                var Method=method
                var ParkingFree=parkingFree
                var LimtYn=limtYn
                var LimitDetail=limitDetail
                
                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(Lat,Lng),
                    map: map // 마커를 표시할 지도 객체
                });

                let cType = "";
                switch (str[idx].chgerType._text){
                    case '01':
                        cType = 'DC차데모'
                        break;
                    case '02':
                        cType = 'AC완속'
                        break;
                    case '03':
                        cType = 'DC차데모+AC3상'
                        break;
                    case '04':
                        cType = 'DC콤보'
                        break;
                    case '05':
                        cType = 'DC차데모+DC콤보'
                        break;
                    case '06':
                        cType = 'DC차데모+AC3상+DC콤보'
                        break;
                    case '07':
                        cType = 'AC3상'
                        break;
                }

                // 인포윈도우를 생성한다
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<span class = "inin">' +str[idx].statNm._text + '<br/>' + str[idx].addr._text + '<br/>' + cType + '</span>'
                });


                markers.push(marker);
                kakao.maps.event.addListener(
                    marker,
                    "mouseover",
                    makeOverListener(map, marker, infowindow)
                );
                kakao.maps.event.addListener(
                    marker,
                    "mouseout",
                    makeOutListener(map, marker, infowindow)
                );
                kakao.maps.event.addListener(marker, 'click', function() {
                    // 마커 위에 인포윈도우를 표시합니다
                    window.open("http://localhost:8080/profile1.html?StatNm="+StatNm+"&StatId="+StatId+"&ChgerType="+ChgerType+
                                "&Addr="+Addr+
                                "&UseTime="+UseTime+
                                "&Bnm="+Bnm+
                                "&BusiNm="+BusiNm+
                                "&BusiCall="+BusiCall+
                                "&Stat="+Stat+
                                "&Output="+Output+
                                "&Method="+Method+
                                "&ParkingFree="+ParkingFree+
                                "&LimtYn="+LimtYn+
                                "&LimitDetail="+LimitDetail+
                                "&Lat="+Lat+
                                "&Lng="+Lng
                    ) 

              });
                
                console.log(Lat);
                console.log(Lng);
                console.log(StatNm);

                var moveLatLon = new kakao.maps.LatLng(Lat, Lng);

    
                // 지도 중심을 부드럽게 이동시킵니다
                // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
                map.panTo(moveLatLon); 


                


            }
        }
        
       
        }
    )
}

// function onReady() {
//     fetch('/getData') // /getTodo 요청
//     .then( 
//         function (res) {
//             if (res.status == 200) {
//                  // 정상적인 응답
//                 return res.json(); // 응답을 JSON 형태를 반환               
//             }   
//         }
//     )
//     .then(
//         function (reqData) {
//             let jsonData = reqData.response.body.items.item;
//             var markers = [];
//             for (let idx in jsonData) {
            
//                 // 지도에 마커를 생성하고 표시한다
//                 var marker = new kakao.maps.Marker({
//                     position: new kakao.maps.LatLng(jsonData[idx].lat._text,jsonData[idx].lng._text),
//                     map: map // 마커를 표시할 지도 객체
//                 });

//                 let cType = "";
//                 switch (jsonData[idx].chgerType._text){
//                     case '01':
//                         cType = 'DC차데모'
//                         break;
//                     case '02':
//                         cType = 'AC완속'
//                         break;
//                     case '03':
//                         cType = 'DC차데모+AC3상'
//                         break;
//                     case '04':
//                         cType = 'DC콤보'
//                         break;
//                     case '05':
//                         cType = 'DC차데모+DC콤보'
//                         break;
//                     case '06':
//                         cType = 'DC차데모+AC3상+DC콤보'
//                         break;
//                     case '07':
//                         cType = 'AC3상'
//                         break;
//                 }

//                 // 인포윈도우를 생성한다
//                 var infowindow = new kakao.maps.InfoWindow({
//                     content: '<span class = "inin">' +jsonData[idx].statNm._text + '<br/>' + jsonData[idx].addr._text + '<br/>' + cType + '</span>'
//                 });


//                 markers.push(marker);
//                 kakao.maps.event.addListener(
//                     marker,
//                     "mouseover",
//                     makeOverListener(map, marker, infowindow)
//                 );
//                 kakao.maps.event.addListener(
//                     marker,
//                     "mouseout",
//                     makeOutListener(map, marker, infowindow)
//                 );

//             }
//             console.log(reqData);   
//         }
//     )
//  }
//  document.addEventListener('DOMContentLoaded', onReady);



// 원하는 주소의 정보 꺼내기

let todoList = new Array(); // Array 초기화
let todoCount = 0; // 새로 추가되는 Todo의 ID
  

function addTask(){
  
    // Task를 추가하기 위한 함수
    todoCount = todoCount + 1; // Todo의 ID 생성
    console.log(todoCount);

    
    // 0. Task 이름 가져오기
    let taskName=document.getElementById('taskName').value;
    
    // 1. HTML 구조에 등록 ----------
    // (1) <li></li> --> taskLI 객체 생성
    let taskLI = document.createElement('li');
    
    // (1-2) <li><input type='checkbox'>
    //           <span>taskName</span></li> 추가
    let taskSpan = document.createElement('span');
    taskSpan.innerHTML = taskName;
    taskLI.appendChild(taskSpan);
    
    // (1-3) taskLI에 대한 Click 이벤트 리스너 등록
    taskLI.addEventListener('click', addList);

    // (1-4) taskLI에 현재 task ID 를 부여
    taskLI.setAttribute('data-id', todoCount);

    // (2) 생성한 taskLI 객체를 <ul> 밑에 삽입
    document.getElementById('todo-list')
            .appendChild(taskLI); // <li> 추가
            
    // -----------------------------
    
    // 2. Data로서 등록
    let currentTodo = {}; // 새로운 Todo 데이터 생성
    currentTodo.name = taskName; // task 이름
    currentTodo.id = todoCount;  // task ID
    currentTodo.isDone = false;  // 할일 완료 여부
    todoList.push(currentTodo); // 데이터를 추가

    // 3. Input 태그 초기화 (검색창 초기화)
    document.getElementById('taskName').value = "";
    
}

function onReady1() {
   fetch('/getData') // /getTodo 요청
   .then( 
       function (res) {
           if (res.status == 200) {
                // 정상적인 응답
                return res.json(); // 응답을 JSON 형태를 반환               
           }
       }
   )
   .then(
    function (reqData) {
        var str=reqData.response.body.items.item
        const rm =  document.getElementById('todo-list')
        text=document.getElementById('taskName').value;

        while (rm.hasChildNodes()) {   // 부모노드가 자식이 있는지 여부를 알아낸다
            rm.removeChild(rm.firstChild );
        }
        
        for (let idx in str) {
            st=str[idx].addr._text
            st1= str[idx].statNm._text
            statId = str[idx].statId._text
            if(st.search(text)!=-1){
                document.getElementById('taskName').value = "<span style= 'opacity: 0;'>" + statId 
                +"</span>" + st1 + "<span style= 'opacity: 0;'>" + statId +"</span>"+ "<br>" + st;
                addTask()
            }
        }
        todoCount = 0;
    }
    )
}



document.getElementById('addTask')
.addEventListener('click', onReady1);
// Input에서 Enter 가 눌렸을 때 addTask 함수 호출
document.getElementById('taskName')
.addEventListener('keydown', function(e){
    if (e.keyCode == 13){ // Enter키의 KeyCode 13
        onReady1(); // 추가하는 addTask 함수 호출
    }
});