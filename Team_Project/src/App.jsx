import './App.css'; 
import { useState, useReducer, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CommentDataContext, CommentDispatchContext, PostDataContext, PostDispatchContext, UserDataContext, UserDispatchContext } from './util/context';
import Main from './components/Main';
import Header from './components/Header';
import Bottom from './components/Bottom';
import HotPostWidget from './components/HotPostWidget'; 
import PostWrite from './components/PostWrite';
import PostDetail from './components/PostDetail';
import FreePostWidget from './components/FreePostWidget';
import NoticePostWidget from './components/NoticePostWidget';
import AuthCenter from './components/AuthCenter';


const mockPosts = [
  {
    postId: 0,
    title: "[필독] 2026학년도 통학 게시판 이용 수칙 및 매너 안내",
    content: "안녕하세요, 통학 게시판 관리자입니다. 서로 존중하는 커뮤니티를 위해 욕설, 비방, 광고성 글은 제한됩니다. 특히 셔틀버스 줄서기 매너를 지켜주시고, 카풀 모집 시 안전에 유의해 주세요.",
    createdAt: "2026-05-16T02:15:22.114Z",
    authorId: 999,
    viewCount: 2450, 
    likeCount: 128,
    commentCount: 45, 
    category: "notification"
  },
  {
    postId: 1,
    title: "강남역 가는 1150번 버스 주말 배차 시간 아시는 분?",
    content: "오늘 주말이라 정류장에서 기다리는데 배차 간격이 평소보다 훨씬 긴 것 같네요ㅠㅠ 혹시 2026년 상반기 변경된 주말 시간표 가지고 계신 분 공유 좀 부탁드립니다!",
    createdAt: "2026-05-16T08:30:45.712Z",
    authorId: 104,
    viewCount: 412,  
    likeCount: 5,
    commentCount: 3, 
    category: "free"
  },
  {
    postId: 2,
    title: "외대 글로벌캠퍼스 정문 앞 새로 생긴 돈까스집 솔직 후기",
    content: "이번 주에 오픈한 돈까스집 다녀왔는데 양 진짜 많고 소스가 대박입니다. 가격도 9,000원이라 가성비 최고예요. 점심시간엔 웨이팅 좀 있으니까 1교시 끝나고 바로 가시는 걸 추천!",
    createdAt: "2026-05-16T11:12:05.891Z",
    authorId: 421,
    viewCount: 728,  
    likeCount: 42,
    commentCount: 14, 
    category: "free"
  },
  {
    postId: 3,
    title: "오픈소스공학 조별 과제 같이 하실 분 구합니다 (컴공)",
    content: "금요일 3, 4교시 오픈소스공학 수업 듣는 컴퓨터공학과 학생입니다. 리액트나 노드 중에서 한 분야 조금이라도 다뤄보신 분이면 좋을 것 같아요! 열심히 해서 A+ 받아봅시다. 오픈채팅으로 연락주세요.",
    createdAt: "2026-05-16T13:45:19.002Z",
    authorId: 87,
    viewCount: 95,   
    likeCount: 2,
    commentCount: 8, 
    category: "free"
  },
  {
    postId: 4,
    title: "기숙사 야간 배달음식 수령 장소 어디가 제일 편한가요?",
    content: "이번에 새로 입사한 신입생인데 보통 밤에 치킨 시키면 어디서 받나요? 정문까지 내려가야 하는지 아니면 기숙사 로비 앞에도 오토바이 들어올 수 있는지 궁금합니다.",
    createdAt: "2026-05-16T14:01:34.937Z",
    authorId: 512,
    viewCount: 320, 
    likeCount: 11,
    commentCount: 21, 
    category: "free"
  },
  {
    postId: 5,
    title: "[공지] 대운동장 잔디 보수 공사로 인한 이용 통제 안내",
    content: "시설관리팀에서 알려드립니다. 대운동장 천연잔디 동해 피해 복구 및 보수 공사로 인해 다음 주 월요일부터 금요일까지 대운동장 출입이 전면 통제되오니 학우 여러분의 양해 부탁드립니다.",
    createdAt: "2026-05-17T01:05:00.000Z",
    authorId: 999,
    viewCount: 1520, 
    likeCount: 34,
    commentCount: 5, 
    category: "notification"
  },
  {
    postId: 6,
    title: "모현읍 주변 자취방 원룸 양도하실 분 찾습니다.",
    content: "개인 사정으로 이번 학기 휴학하게 되어서 학교 앞 원룸 계약 기간 채우셔야 하거나 급하게 양도하실 분 구합니다. 위치는 정문에서 도보 10분 이내 선호해요. 쪽지 주세요!",
    createdAt: "2026-05-15T09:20:11.451Z",
    authorId: 231,
    viewCount: 184, 
    likeCount: 0,
    commentCount: 1, 
    category: "free"
  },
  {
    postId: 7,
    title: "셔틀버스 광주캠 노선 예약 마감 시간 몇 시까지임?",
    content: "맨날 통학버스 앱으로 예약하다가 깜빡했는데 전날 몇 시까지 예약 마감인가요? 지금 들어가니까 예약 버튼이 안 눌려서 조마조마하네요 대중교통 타야 하나요...",
    createdAt: "2026-05-16T15:30:22.887Z",
    authorId: 84,
    viewCount: 290, 
    likeCount: 4,
    commentCount: 12,
    category: "free"
  },
  {
    postId: 8,
    title: "오늘 학생회관 앞에서 버스킹 하시는 분들 노래 진짜 잘 부르시네요",
    content: "공강 시간에 지나가다가 들었는데 음색 대박이네요... 혹시 중앙동아리인가요? 마지막에 부른 인디 곡 제목 아시는 분 있으면 댓글로 알려주시면 감사하겠습니다!",
    createdAt: "2026-05-16T12:00:44.123Z",
    authorId: 302,
    viewCount: 810, 
    likeCount: 56,
    commentCount: 18, 
    category: "free"
  },
  {
    postId: 9,
    title: "[안내] 2026년 1학기 중간 강의평가 실시 안내",
    content: "학사지원팀입니다. 교육의 질 향상과 원활한 수업 진행을 위해 2026학년도 제1학기 중간 강의평가를 다음과 같이 실시하오니 학생 여러분은 기한 내에 반드시 참여해 주시기 바랍니다.",
    createdAt: "2026-05-14T03:00:00.000Z",
    authorId: 999,
    viewCount: 3100,
    likeCount: 12, 
    commentCount: 2, 
    category: "notification"
  },
  {
    postId: 10,
    title: "교양 스페인어 입문 과제 마감일이 오늘까지인가요?",
    content: "e-campus에 공지가 따로 안 올라온 것 같아서 헷갈리네요. 지난주 수업 때 교수님이 이번 주말까지 레포트 제출하라고 하셨던 기억이 나는데 정확한 시간 아시는 분?",
    createdAt: "2026-05-16T16:45:00.000Z",
    authorId: 104,
    viewCount: 142,
    likeCount: 1,
    commentCount: 4,
    category: "free"
  },
  {
    postId: 11,
    title: "생능출판사 운영체제 전공책 중고로 파실 분 계신가요?",
    content: "컴공 전공서적인데 이번 학기 실습 때 필요해서 급하게 구합니다. 필기 흔적이나 낙서 많아도 상관없으니 찢어진 곳만 없으면 됩니다! 가격 맞춰드릴 테니 연락주세요.",
    createdAt: "2026-05-16T18:12:30.555Z",
    authorId: 87,
    viewCount: 88,
    likeCount: 0,
    commentCount: 2,
    category: "free"
  },
  {
    postId: 12,
    title: "중앙 도서관 노트북 열람실 와이파이 저만 계속 끊기나요?",
    content: "오늘 아침부터 과제 하려고 도서관 3층 앉아있는데 5분에 한 번씩 연결이 유실되네요. 제 노트북 문제인지 학교 서버 문제인지 궁금합니다. 다른 분들은 잘 되시나요?",
    createdAt: "2026-05-17T02:30:15.000Z",
    authorId: 421,
    viewCount: 210,
    likeCount: 8,
    commentCount: 15, // 🔥 핫게시물 조건 충족 (댓글 10개 이상)
    category: "free"
  },
  {
    postId: 13,
    title: "[공지] 학내 흡연구역 외 절대 금연 및 과태료 부과 안내",
    content: "학생지원팀입니다. 최근 지정된 흡연구역 외 건물의 계단, 옥상, 벤치 등에서의 흡연으로 인한 민원이 다수 발생하고 있습니다. 적발 시 과태료가 부과될 수 있으니 지정 장소를 이용 바랍니다.",
    createdAt: "2026-05-13T09:00:00.000Z",
    authorId: 999,
    viewCount: 1890,
    likeCount: 22,
    commentCount: 38, // 🔥 핫게시물 조건 충족
    category: "notification"
  },
  {
    postId: 14,
    title: "학교 커뮤니티 앱(OOPS) 개발중인데 피드백 좀 해주라",
    content: "웹프로그래밍 프로젝트 겸 동아리원들이랑 소소하게 통학러 전용 웹앱 만들고 있거든? 지금 페이지네이션이랑 게시판 정렬 기능까지 붙였는데 UI 검수 좀 도와줄 사람 구함!!",
    createdAt: "2026-05-17T03:10:00.000Z", // ⏱️ 초신작 글
    authorId: 512,
    viewCount: 510,
    likeCount: 33, // 🔥 핫게시물 조건 충족
    commentCount: 27,
    category: "free"
  },
  {
    postId: 15,
    title: "정문 앞 서점 토요일에도 영업 하나요?",
    content: "교재 분실해서 새로 한 권 사야 하는데 주말에도 문 여는지 모르겠네요. 혹시 사장님 연락처나 주말 영업시간 아시는 학우분 답변 부탁드립니다.",
    createdAt: "2026-05-16T05:22:11.000Z",
    authorId: 104,
    viewCount: 94,
    likeCount: 2,
    commentCount: 0,
    category: "free"
  },
  {
    postId: 16,
    title: "이번 학기 학식 메뉴 중에서 직화 제육덮밥 먹어본 사람??",
    content: "인문관 식당 새로 리뉴얼되고 나서 직화 라인 생겼길래 먹어봤는데 불맛 대박이고 양도 장난 아니네요. 앞으로 점심은 무조건 여기서 때울 듯요 강추합니다.",
    createdAt: "2026-05-16T12:40:59.112Z",
    authorId: 421,
    viewCount: 602,
    likeCount: 19, // 🔥 핫게시물 조건 충족
    commentCount: 11,
    category: "free"
  },
  {
    postId: 17,
    title: "셔틀버스 증차 요구 서명운동 링크 공유합니다.",
    content: "매일 아침 8시 20분 서현역 노선 줄 설 때마다 미어터져서 지각하는 학우분들 많으시죠? 총학생회와 연계하여 대학 본부에 정식 증차 요청을 하기 위한 설문을 진행 중이니 많은 참여 바랍니다.",
    createdAt: "2026-05-15T14:22:00.000Z",
    authorId: 87,
    viewCount: 1120,
    likeCount: 95, // 🔥 핫게시물 조건 충족
    commentCount: 42,
    category: "free"
  },
  {
    postId: 18,
    title: "야간 작업이나 야자하기 좋은 24시 카페 있을까요?",
    content: "시험기간은 아니지만 팀플 과제 코딩 양이 너무 많아서 밤새서 작업할 공간이 필요합니다. 학교 근처에 카공하기 좋고 눈치 안 보이는 24시 카페 추천 좀 해주세요.",
    createdAt: "2026-05-16T22:19:44.000Z",
    authorId: 512,
    viewCount: 415,
    likeCount: 6,
    commentCount: 9,
    category: "free"
  },
  {
    postId: 19,
    title: "[안내] 2026학년도 하계 글로벌 해외 봉사단 모집 공고",
    content: "국제교류팀에서 안내합니다. 다가오는 여름방학 동안 아시아 및 아프리카 지역에서 교육 봉사 및 노력 봉사를 펼칠 참신하고 책임감 있는 해외 봉사단을 집결하오니 많은 지원 바랍니다.",
    createdAt: "2026-05-12T02:00:00.000Z",
    authorId: 999,
    viewCount: 4200, // 📈 엄청 높은 조회수
    likeCount: 54,
    commentCount: 16,
    category: "notification"
  },
  {
    postId: 20,
    title: "에어팟 프로2 본체(맥세이프형) 도서관 지하 매점에서 분실",
    content: "오늘 오후 4시쯤 지하 매점 테이블에서 음료수 마시다가 두고 내린 것 같습니다. 철제 케이스 끼워져 있고 이름 이니셜 'HM' 각인되어 있어요. 주우신 분 제발 연락 부탁드려요 고기 사드릴게요.",
    createdAt: "2026-05-16T19:05:11.231Z",
    authorId: 104,
    viewCount: 280,
    likeCount: 3,
    commentCount: 5,
    category: "free"
  },
  {
    postId: 21,
    title: "컴퓨터공학과 2026년 소모임 연합 엠티 수요조사",
    content: "안녕하세요 컴공 학생회 체육부입니다! 다가오는 5월 말 대성리로 예정된 연합 MT 수요조사 폼을 오픈했습니다. 인원 파악 후 버스 대절 및 숙소 예약 예정이니 이번 주까지 꼭 체크해 주세요.",
    createdAt: "2026-05-15T11:00:00.000Z",
    authorId: 87,
    viewCount: 395,
    likeCount: 14, // 🔥 핫게시물 조건 충족
    commentCount: 8,
    category: "free"
  },
  {
    postId: 22,
    title: "정문 코인노래방 서비스 시간 원래 이렇게 혜자임?",
    content: "방금 친구랑 5천원 넣고 부르는데 보너스를 계속 주셔가지고 2시간째 못 나가는 중ㅋㅋㅋㅋ 사장님 남는 거 있으신가요? 시설도 깔끔하고 음향 장비 빵빵해서 단골 예약입니다.",
    createdAt: "2026-05-16T21:11:00.000Z",
    authorId: 421,
    viewCount: 520,
    likeCount: 22, // 🔥 핫게시물 조건 충족
    commentCount: 7,
    category: "free"
  },
  {
    postId: 23,
    title: "미시경제학 조교님 연락처 아시는 분 계신가요?",
    content: "출결 정정 때문에 메일을 보내야 하는데 강의계획서에 적힌 번호가 없는 번호라고 뜨네요. 혹시 학과사무실 거치지 않고 조교님께 다이렉트로 연락할 수 있는 이메일 아시면 공유 부탁드려요.",
    createdAt: "2026-05-16T10:05:19.000Z",
    authorId: 231,
    viewCount: 110,
    likeCount: 1,
    commentCount: 2,
    category: "free"
  },
  {
    postId: 24,
    title: "축제 연예인 라인업 찌라시 돌던데 진짜인가요??",
    content: "단톡방에 이번 대동제 라인업이라고 이미지 하나 돌고 있는데 아이돌 두 팀에 유명 밴드 섞여 있더라고요. 예산 엄청 썼다는 소문이 있던데 혹시 학생회 패밀리 계시면 스포 좀 해주세요!!",
    createdAt: "2026-05-15T17:35:00.000Z",
    authorId: 302,
    viewCount: 1980,
    likeCount: 67, // 🔥 핫게시물 조건 충족
    commentCount: 54, // 🔥 댓글 대폭발
    category: "free"
  },
  {
    postId: 25,
    title: "[공지] 교내 노후 엘리베이터 교체 공사 및 운행 중단 안내",
    content: "시설안전팀입니다. 학생회관 및 공학관의 노후 승강기 정밀 안전점검 결과에 따라 전면 교체 공사를 실시합니다. 공사 기간 중 계단을 이용해 주시기 바라며 소음이 발생할 수 있으니 양해 바랍니다.",
    createdAt: "2026-05-11T09:00:00.000Z",
    authorId: 999,
    viewCount: 1450,
    likeCount: 4,
    commentCount: 11, // 🔥 핫게시물 조건 충족
    category: "notification"
  },
  {
    postId: 26,
    title: "셔틀버스 카드 단말기 태그 안 될 때 꿀팁 준다",
    content: "매번 찍을 때마다 '다시 대주세요' 뜨는 사람 많지? 그거 스마트폰 NFC 기능이 켜져 있어서 카드랑 주파수 간섭 생겨서 그런 거임. 지갑에서 카드 꺼내 찍거나 NFC 완전히 끄면 한 방에 찍힌다.",
    createdAt: "2026-05-16T07:15:33.000Z",
    authorId: 104,
    viewCount: 920,
    likeCount: 41, // 🔥 핫게시물 조건 충족
    commentCount: 19,
    category: "free"
  },
  {
    postId: 27,
    title: "내일 비 많이 온다는데 다들 우산 챙겨라",
    content: "기상청 특보 보니까 아침 출근/통학 시간대에 시간당 20mm 이상 장대비 쏟아진다고 함. 다들 신발 젖지 말고 장화 신거나 여벌 양말 챙겨오는 거 추천함. 지각하지 마라 화이팅!",
    createdAt: "2026-05-16T23:50:11.000Z",
    authorId: 302,
    viewCount: 450,
    likeCount: 15, // 🔥 핫게시물 조건 충족
    commentCount: 6,
    category: "free"
  },
  {
    postId: 28,
    title: "공과대학 매점 라면 조리기 도입 대찬성 글",
    content: "한강 라면 조리기 공대 지하 매점에 드디어 들어왔네요! 봉지라면 사서 기계에 올리면 타이머 맞춰서 끓여주는데 진짜 PC방 라면 저리가라 수준으로 꼬들꼬들 맛있음ㅋㅋ 다들 꼭 먹어보셈.",
    createdAt: "2026-05-16T13:10:00.000Z",
    authorId: 512,
    viewCount: 630,
    likeCount: 28, // 🔥 핫게시물 조건 충족
    commentCount: 13,
    category: "free"
  },
  {
    postId: 29,
    title: "[안내] 2026-1학기 국가장학금 2차 신청 마감 임박 안내",
    content: "장학복지팀입니다. 한국장학재단에서 주관하는 국가장학금 1학기 2차 신청 기간이 이틀 뒤 마감됩니다. 신입생, 편입생, 복학생 중 아직 신청하지 않은 대상자는 서둘러 서류 제출을 완료 바랍니다.",
    createdAt: "2026-05-10T04:00:00.000Z", // 가장 오래된 글
    authorId: 999,
    viewCount: 3500,
    likeCount: 45, // 🔥 핫게시물 조건 충족
    commentCount: 3,
    category: "notification"
  }
];

const mockUsers = [
  { id: 999, userName: "admin_manager",    email: "admin@oops.ac.kr",      profile_image: "https://picsum.photos/id/1025/150/150" },
  { id: 104, userName: "user104_tong",     email: "tong104@example.com",   profile_image: "https://picsum.photos/id/64/150/150" },
  { id: 421, userName: "user421_matzip",   email: "matzip421@example.com", profile_image: "https://picsum.photos/id/103/150/150" },
  { id: 87,  userName: "user87_cse",       email: "cse87@example.com",     profile_image: "https://picsum.photos/id/1062/150/150" },
  { id: 512, userName: "user512_dev",      email: "dev512@example.com",    profile_image: "https://picsum.photos/id/338/150/150" },
  { id: 231, userName: "user231_mohyun",   email: "mohyun231@example.com", profile_image: "https://picsum.photos/id/177/150/150" },
  { id: 302, userName: "user302_music",    email: "music302@example.com",  profile_image: "https://picsum.photos/id/453/150/150" },
  { id: 1,   userName: "user1_kim",        email: "kim1@example.com",      profile_image: "https://picsum.photos/id/65/150/150" },
  { id: 2,   userName: "user2_lee",        email: "lee2@example.com",      profile_image: "https://picsum.photos/id/91/150/150" },
  { id: 3,   userName: "user3_park",       email: "park3@example.com",     profile_image: "https://picsum.photos/id/1005/150/150" },
  { id: 4,   userName: "user4_choi",       email: "choi4@example.com",     profile_image: "https://picsum.photos/id/342/150/150" },
  { id: 5,   userName: "user5_jung",       email: "jung5@example.com",     profile_image: "https://picsum.photos/id/447/150/150" },
  { id: 6,   userName: "user6_kang",       email: "kang6@example.com",     profile_image: "https://picsum.photos/id/564/150/150" },
  { id: 7,   userName: "user7_cho",        email: "cho7@example.com",      profile_image: "https://picsum.photos/id/669/150/150" },
  { id: 8,   userName: "user8_yoon",       email: "yoon8@example.com",     profile_image: "https://picsum.photos/id/779/150/150" },
  { id: 9,   userName: "user9_jang",       email: "jang9@example.com",     profile_image: "https://picsum.photos/id/824/150/150" },
  { id: 10,  userName: "user10_lim",       email: "lim10@example.com",     profile_image: "https://picsum.photos/id/837/150/150" },
  { id: 11,  userName: "user11_han",       email: "han11@example.com",     profile_image: "https://picsum.photos/id/996/150/150" },
  { id: 12,  userName: "user12_oh",        email: "oh12@example.com",      profile_image: "https://picsum.photos/id/1011/150/150" },
  { id: 13,  userName: "user13_seo",       email: "seo13@example.com",     profile_image: "https://picsum.photos/id/1027/150/150" }
];

const mockComments = [
  // ==========================================
  // 12번 게시글: 댓글 총 2개 (댓글 1개 + 대댓글 1개)
  // ==========================================
  { 
    id: 1,  
    postId: 12, 
    authorId: 104, 
    content: "도서관 와이파이 3층 저만 그런 게 아니었군요! 진짜 계속 끊겨서 핫스팟 켰습니다 ㅠㅠ", 
    createdAt: "2026-05-17T02:35:11.000Z", 
    parentId: null, // 일반 댓글
    likeCount: 12 
  },
  { 
    id: 2,  
    postId: 12, 
    authorId: 512, 
    content: "맥북 쓰시나요? 특정 OS에서 가끔 학내 와이파이 프로필이랑 충돌 나더라고요.", 
    createdAt: "2026-05-17T02:38:22.000Z", 
    parentId: 1, // 1번 댓글에 대한 대댓글
    likeCount: 24 
  },

  // ==========================================
  // 14번 게시글: 댓글 총 1개 (단독 댓글 1개)
  // ==========================================
  { 
    id: 3,  
    postId: 14, 
    authorId: 104, 
    content: "오 통학러 앱이라니 아이디어 너무 좋네요! 혹시 테스터 모집하시나요?", 
    createdAt: "2026-05-17T03:15:00.000Z", 
    parentId: null, 
    likeCount: 8 
  },

  // ==========================================
  // 16번 게시글: 댓글 총 3개 (댓글 2개 + 대댓글 1개)
  // ==========================================
  { 
    id: 4, 
    postId: 16, 
    authorId: 87,  
    content: "여기 직화 제육 인정합니다 ㅋㅋㅋ 불맛 제대로 나서 요즘 점심마다 도장 깨기 중이에요.", 
    createdAt: "2026-05-16T12:45:12.000Z", 
    parentId: null, 
    likeCount: 31 
  },
  { 
    id: 5, 
    postId: 16, 
    authorId: 231, 
    content: "거기 현금 결제만 되나요 아니면 카드나 페이코도 다 먹히나요?", 
    createdAt: "2026-05-16T12:48:59.000Z", 
    parentId: 4, // 4번 댓글에 대한 대댓글
    likeCount: 0 
  },
  { 
    id: 6, 
    postId: 16, 
    authorId: 302, 
    content: "꿀정보 감사합니다. 내일 점심은 무조건 제육으로 달립니다.", 
    createdAt: "2026-05-16T12:55:22.000Z", 
    parentId: null, 
    likeCount: 2 
  },

  // ==========================================
  // 24번 게시글: 댓글 총 0개 (글 리스트에서 배지가 뜨지 않는지 확인용)
  // ==========================================
  // (24번 postId를 가진 데이터는 일부러 비워두었습니다.)

  // ==========================================
  // 26번 게시글: 댓글 총 2개 (단독 댓글 2개)
  // ==========================================
  { 
    id: 7, 
    postId: 26, 
    authorId: 3,   
    content: "와 안 그래도 매번 카드 찍을 때마다 에러 나서 뒷사람 눈치 보였는데 내일 당장 해볼게요.", 
    createdAt: "2026-05-16T07:22:15.000Z", 
    parentId: null, 
    likeCount: 7 
  },
  { 
    id: 8, 
    postId: 26, 
    authorId: 4,   
    content: "스마트폰 NFC 기본 모드를 카드 모드로만 바꿔도 주파수 간섭 훨씬 줄어들더라고요.", 
    createdAt: "2026-05-16T07:30:11.000Z", 
    parentId: null, 
    likeCount: 29 
  }
];

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE": 
      return [action.data, ...state]; 

    case "DELETE": 
      return state.filter((item) => item.postId !== action.id); 

    case "UPDATE": 
      return state.map((item) => item.postId === action.id ? action.data : item); 

    default: 
      return state;
  }
}

const reducerUser = (state, action)=>{
  switch (action.type){
    case "CREATE": 
      return [action.userData, ...state]; 

    case "DELETE": 
      return state.filter((item)=> item.id !== action.id); 

    case "UPDATE": 
      return state.map((item)=>(
        item.id === action.id ? action.userData : item
      )); 

    default: 
      return state; 
  }
}

const reducerComment = (state, action)=>{
  switch (action.type){
    case "CREATE": 
      return [action.commentData, ...state]; 

    case "DELETE": 
      return state.filter((item)=>item.id !== action.id);
      
    case "UPDATE": 
      return state.map((item)=>(
        item.id === action.id ? action.commentData : item
      )); 

    default: 
      return state; 
  }
}

function App() {
  const [posts, dispatchPost] = useReducer(reducer, mockPosts);
  const [users, dispatchUser] = useReducer(reducerUser, mockUsers); 
  const [comments, dispatchComment] = useReducer(reducerComment, mockComments); 
  const postRef = useRef(30); 
  const authorRef = useRef(14); 
  const commentRef = useRef(21); 
  

  //Posting 관련 dispatch 함수들
  const onCreatePost = (title, content, createdAt, authorId, likeCount = 0, commentCount = 0) => {
    dispatchPost({
      type: "CREATE", 
      data: {
        postId: postRef.current++, 
        title, 
        content, 
        createdAt, 
        authorId, 
        likeCount, 
        commentCount,  
      }
    }); 
  }

  const onDeletePost = (id) => {
    dispatchPost({
      type: "DELETE", 
      id: id, 
    }); 
  }

  const onUpdatePost = (id, title, content, createdAt, authorId, likeCount, commentCount) => {
    dispatchPost({
      type: "UPDATE", 
      id: id,
      data: {
        postId: id,
        title, 
        content, 
        createdAt, 
        authorId, 
        likeCount, 
        commentCount,
      }
    }); 
  }

  //계정 관련 dispatch 함수들
  const onCreateUserInfo = (userInfo)=>{
    dispatchUser({
      type: "CREATE", 
      userData: {
        ...userInfo,
        id: authorRef.current++,  
      }
    }); 
  }

  const onDeleteUserInfo = (id)=>{
    dispatchUser({
      type: "DELETE", 
      id: id, 
    })
  }

  const onUpdateUserInfo = (id, userName, email, password) =>{
    dispatchUser({
      type: "UPDATE", 
      id: id, 
      userData: {
        id: id, 
        userName, 
        email, 
        password
      }
    })
  }

  const onCreateComment = (commentInfo)=>{
    dispatchComment({
      type: "CREATE", 
      commentData: {
        id: commentRef.current++,
        ...commentInfo, 
        
      }
    })
  }

  const onDeleteComment = (id)=>{
    dispatchComment({
      type: "DELETE", 
      id: id,
    })
  }

  const onUpdateComment = (id, commentInfo)=>{
    dispatchComment({
      type: "UPDATE", 
      id: id, 
      commentData: {
        id: id, 
        ...commentInfo, 
      }
    })
  }

  return (
    <UserDataContext.Provider value={users}>
      <UserDispatchContext.Provider value={{onCreateUserInfo, onDeleteUserInfo, onUpdateUserInfo}}>
        <PostDataContext.Provider value={posts}>
          <PostDispatchContext.Provider value={{onCreatePost, onDeletePost, onUpdatePost}}>
            <CommentDataContext.Provider value={comments}>
              <CommentDispatchContext.Provider value={{onCreateComment, onDeleteComment, onUpdateComment}}>
                <div className='app-container'>
                  <Header />
                  <Routes>
                    <Route path='/' element={<Main></Main>} />
                    <Route path='/popular' element={<HotPostWidget></HotPostWidget>} />
                    <Route path='/free' element={<FreePostWidget></FreePostWidget>}></Route>
                    <Route path='/notice' element={<NoticePostWidget></NoticePostWidget>}></Route>
                    <Route path='/write' element={<PostWrite></PostWrite>}></Route>
                    <Route path='/detail/:postId' element={<PostDetail></PostDetail>}></Route>
                    <Route path='/auth' element={<AuthCenter></AuthCenter>}></Route>
                  </Routes>
                  <Bottom />
                </div>
              </CommentDispatchContext.Provider>
            </CommentDataContext.Provider>
          </PostDispatchContext.Provider>
        </PostDataContext.Provider>
      </UserDispatchContext.Provider>
    </UserDataContext.Provider>
  )
}

export default App;