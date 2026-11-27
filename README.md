# 남진 교수 제11대 서울시립대학교 총장선거 홍보 홈페이지 — 개편 레이아웃

빌드·설치 없이 작동하는 순수 HTML/CSS/JavaScript 기반의 선거 홍보 웹사이트입니다.

## 파일 구조
- `index.html`: 메인 페이지 (홈, 왜 남진인가, 걸어온 길, 7대 대표공약, 캠퍼스 환경개선 영상, 공약 카드뉴스, 파일 받기, 아카이브, 푸터)
- `statement.html`: 별도 '소견서' 페이지 (준비 중 안내 및 메인 복귀 링크, 동일 디자인/메뉴 체계 공유)
- `styles.css`: 디자인 시스템 (색상 변수, 반응형 레이아웃, 트리 다이어그램, 7대 공약 4+3 그리드, 아카이브 호버 버튼 등)
- `data.js`: 메뉴, 왜 남진인가 3대 역량, 걸어온 길 경력 목록, 7대 대표공약, 영상 설정, 파일 목록, 아카이브(58건) 데이터
- `app.js`: 데이터 기반 동적 렌더링, 영상 처리, 토글 인터랙션, 스크롤스파이, 모바일 드로어 메뉴 포커스 관리
- `president_assets/`: 걸어온 길 사진(`교수님니트_가장긴거.jpg`), 기존 사진(`jin_nam.jpg`), 언론 아카이브 원본(`interview_column_etc_1117.xlsx`), 현장 사진 등

## 메인 페이지 섹션 순서
1. **홈 (`#home`)**: 슬로건, 보조 문구, 7대 대표공약 및 소견서 버튼, 유튜브 대표 영상과 대상별 영상 카드
2. **왜 남진인가? (`#why`)**: 3갈래 도식 (상단 '왜 남진인가?' → 수직/수평 분기선 → '서울시', '공공기관', '서울시립대' 3개 박스 및 경력 설명 영역, 모바일은 세로 브랜치형 타임라인 전환)
3. **걸어온 길 (`#journey`)**: 학력 3줄, 분야별 경력 탭과 선택 목록, 오른쪽 교수 사진 영역 (모바일은 학력·사진·경력 순서)
4. **7대 대표공약 (`#pledges`)**: 분야·번호·전체 제목을 표시하는 7개 아코디언 (PC·태블릿 2열, 좁은 화면 1열, 상세 항목은 한 번에 하나씩 펼침)
5. **캠퍼스 환경개선 (`#campus`)**: [영상 소개] 및 16:9 영상 슬롯 (준비 중)
6. **공약 카드뉴스 (`#cardnews`)**: 카드뉴스 등록 준비 중 플레이스홀더 영역
7. **파일 받기 (`#downloads`)**: 공약집, 이력 요약본, 소견서 등 PDF 다운로드
8. **아카이브 (`#archive`)**: 58건 과거 언론 인터뷰·칼럼·기고문 (최신 3개 기본 노출, '모두 보기 (총 58건) ↓' 토글, '원문 보기 →' 아웃라인 버튼 호버 효과)
9. **푸터**: 후보자명, 운영 주체, 문의처

## 향후 콘텐츠 입력 가이드 (`data.js`)
- **대표·대상별 영상**: `data.js`의 `heroVideo.src`와 `audienceVideos` 각 항목의 `url`에 유튜브 주소 입력. 대표 영상은 무음 자동 재생을 시도하고, 차단되면 재생 버튼을 이용함. 대상별 주소가 비어 있으면 준비 중으로 표시되며, 주소 입력 시 썸네일과 모달 재생이 활성화됨. 로컬에서는 파일을 직접 여는 대신 프로젝트 폴더에서 `python -m http.server 8000`을 실행하고 `http://localhost:8000`으로 확인
- **왜 남진인가? 경력 설명**: `data.js`의 `why` 배열 3개 항목의 `description` 수정
- **걸어온 길**: `data.js`의 `education` 배열에서 학력, `journey` 배열의 분야별 `items`에서 경력 (`period`, `title`), `journeyPhoto`에서 사진 경로와 대체텍스트 수정
- **7대 대표공약**: `data.js`의 `pledges7` 배열에서 공약을 관리하고, 각 `details` 배열에 `{ title, description }` 형식의 확정된 세부 공약을 추가 (미입력 항목은 사이트에서 준비 중으로 표시)
- **캠퍼스 환경개선 영상**: `data.js`의 `campusVideo.src`, `intro` 수정
- **공약 카드뉴스**: `data.js`의 `cardNews` 배열에 `{ src: './president_assets/파일명.jpg', alt: '설명' }` 추가
- **소견서 본문**: `statement.html`의 `#statement-content` 영역 활성화 및 내용/PDF 등록
- **다운로드 파일**: `president_assets` 폴더에 PDF를 넣고 `downloads` 항목의 `url`에 './president_assets/파일명.pdf' 입력. 소견서 항목(`id: 'statement'`)의 URL은 홈 버튼에도 사용됨. GitHub Pages에서 제공하려면 해당 파일도 저장소에 포함해야 함

## 홈페이지 운영

운영 대상은 GitHub 저장소 `dockzone22/vote_namjin`의 `main` 브랜치 `/(root)`에서 게시하는 GitHub Pages와 공식 주소 `https://namjin.uos.ac.kr`입니다. Cloudflare는 `namjin.kr`과 `www.namjin.kr`의 DNS 및 공식 주소로 이동하는 Redirect Rule 용도로 유지합니다. 실제 설정과 주소 이동은 대시보드에서 별도로 확인해야 합니다.

1. 사이트 파일을 수정합니다.
2. 프로젝트 폴더에서 `python -m http.server 8000`을 실행하고 `http://localhost:8000`에서 화면·다운로드·영상을 확인합니다.
3. 변경할 파일을 검토한 뒤 commit·push합니다. PDF와 이미지도 Git에 포함되어야 GitHub Pages에서 제공됩니다.
4. GitHub Pages 배포가 완료됐는지 확인한 뒤 공식 주소에서 실제 화면과 링크를 확인합니다.

공식 주소의 루트 `CNAME`은 `namjin.uos.ac.kr`이어야 합니다. 현재 로컬 `CNAME`은 `namjin.kr`이지만 원격 `main`은 이미 `namjin.uos.ac.kr`입니다. 로컬 변경을 보존하면서 원격 변경을 동기화한 뒤 GitHub Pages 사용자 지정 도메인 설정과 일치하는지 확인하세요.

두 HTML 파일에는 `noindex, nofollow` 메타 태그가 있습니다. GitHub Pages는 Worker의 검색 설정과 비밀번호 인증을 적용하지 않으므로 검색 노출을 원한다면 해당 태그를 별도로 검토해야 합니다. GitHub Pages에 게시된 파일은 공개됩니다.

### 일시적으로 사이트 내리기

GitHub Pages의 **Unpublish site**는 현재 배포를 내리며 저장소와 설정은 유지합니다. Unpublish 중에는 공개 준비가 되기 전까지 게시 브랜치에 push하지 마세요. 새 배포로 다시 공개될 수 있습니다.

다시 공개할 때는 기존 도메인과 DNS 설정을 유지하고 게시 브랜치에 커밋을 push하여 새 배포를 진행합니다. 도메인을 삭제·재등록하거나 DNS를 변경할 필요는 없습니다. 단, 현재 `CNAME`과 실제 Pages 도메인 설정이 서로 일치하는지 먼저 확인하세요. 자세한 내용은 [GitHub의 Unpublish 안내](https://docs.github.com/en/pages/getting-started-with-github-pages/unpublishing-a-github-pages-site)를 참고하세요.

### 보관용 Cloudflare Worker

기존 Worker 코드와 설정은 보관용이며 공식 GitHub Pages 운영에 필요하지 않습니다. Worker의 Git 자동 배포 연결은 Cloudflare 대시보드의 해당 Worker **Settings → Builds**에서 사용자가 직접 해제합니다. 연결 상태와 Redirect Rule은 이 문서에서 검증하지 않았습니다.

`npm run build:review`, `npm run dev:review`, `npm run deploy:review`는 과거 Worker용 명령입니다. 특히 `deploy:review`는 Worker에 실제 배포하므로 일반적인 GitHub Pages 업데이트에 사용하지 마세요. Worker용 준비 스크립트의 개별 파일 제한 25 MiB는 GitHub Pages 게시 제한과 별개이며, Worker 배포 시에는 계속 적용됩니다. GitHub Pages의 제한은 [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)를 확인하세요.
