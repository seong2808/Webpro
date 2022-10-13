var url1 = document.location.href
const url = new URL(url1);

// URLSearchParams 객체
const urlParams = url.searchParams;

// URLSearchParams.get()
let lat = urlParams.get('Lat');
let lng = urlParams.get('Lng');
let statNm = urlParams.get('StatNm');
let chgerType = urlParams.get('ChgerType');
let addr = urlParams.get('Addr');
let useTime = urlParams.get('UseTime');
let bnm = urlParams.get('Bnm');
let busiNm = urlParams.get('BusiNm');
let busiCall = urlParams.get('BusiCall');
let stat = urlParams.get('Stat');
let output = urlParams.get('Output');
let method = urlParams.get('Method');
let parkingFree = urlParams.get('ParkingFree');
let limtYn = urlParams.get('LimtYn');
let limitDetail = urlParams.get('LimitDetail');

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = {
                    center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
                    level: 4, // 지도의 확대 레벨
                    mapTypeId : kakao.maps.MapTypeId.ROADMAP // 지도종류
                }; 

            // 지도를 생성한다 
            var map = new kakao.maps.Map(mapContainer, mapOption); 

            // 실시간교통 타일 이미지 추가
            map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 

            // 마우스 휠과 모바일 터치를 이용한 지도 확대, 축소를 막는다
            map.setZoomable(false);   

            // 지도 타입 변경 컨트롤을 생성한다
            var mapTypeControl = new kakao.maps.MapTypeControl();

            // 지도의 상단 우측에 지도 타입 변경 컨트롤을 추가한다
            map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);	

            // 지도에 확대 축소 컨트롤을 생성한다
            var zoomControl = new kakao.maps.ZoomControl();

            // 지도의 우측에 확대 축소 컨트롤을 추가한다
            map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

            // 지도에 마커를 생성하고 표시한다
            var marker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(lat, lng), // 마커의 좌표
                map: map // 마커를 표시할 지도 객체
            });


let state = ""
switch (stat){
    case '1':
        state = '통신이상'
        break;
    case '2':
        state = '충전대기'
        break;
    case '3':
        state = '충전 중'
        break;
    case '4':
        state = '운영중지'
        break;
    case '5':
        state = '점검 중'
        break;
    case '9':
        state = '상태미확인'
        break;
}

let cType = "";
switch (chgerType){
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

let lYn = "";
switch (limtYn){
    case 'Y':
        lYn = '충전기 사용 불가능'
        break;
    case 'N':
        lYn = '충전기 사용 가능'
        break;
}


if(useTime == 'undefined'){
    useTime = '제한없음'
}

if(limitDetail == 'undefined'){
    limitDetail = '해당사항 없음'
}

let pFree = "";
switch (parkingFree){
    case 'Y':
        pFree = '무료'
        break;
    case 'N':
        pFree = '유료'
        break;
}

console.log(statNm)
console.log(cType)
console.log(addr)
console.log(useTime)
console.log(bnm)
console.log(busiNm)
console.log(busiCall)
console.log(state)
console.log(output)
console.log(method)
console.log(parkingFree)
console.log(limtYn)
console.log(limitDetail)

let charArray = ["충전기 타입 : " + cType,"주소 : " + addr,"사용 시간 : " + useTime,"기관 명 : " + bnm,"운영기관 명 : " 
+ busiNm,"운영기관 연락처 : " + busiCall,"충전기 상태 : " + state ,"충전 용량 : " + output +" ( KW )","충전 방식 : " + 
method,"주차비용 유무 : " + pFree, lYn,"※ 제한 사유 : " + limitDetail];
let idArray = ['cType','addr','useTime','bnm','busiNm','busiCall','state','output','method','parkingFree','limtYn','limitDetail'];

let charNm = document.createElement('h1');
charNm.innerHTML = statNm;
document.getElementById('charHead')
            .appendChild(charNm);

for(let char in charArray) {
    let charLi = document.createElement('li');

    charLi.innerHTML = charArray[char];

    document.getElementById('charinfo')
            .appendChild(charLi);

            for(let id in idArray) {
                charLi.setAttribute('id', idArray[id]);
                if (char == id)
                    break;
            }
}

