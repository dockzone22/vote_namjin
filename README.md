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
- **대표·대상별 영상**: `data.js`의 `heroVideo.src`와 `audienceVideos` 각 항목의 `url`에 유튜브 주소 입력. 대상별 주소가 비어 있으면 준비 중으로 표시되며, 주소 입력 시 썸네일과 모달 재생이 활성화됨
- **왜 남진인가? 경력 설명**: `data.js`의 `why` 배열 3개 항목의 `description` 수정
- **걸어온 길**: `data.js`의 `education` 배열에서 학력, `journey` 배열의 분야별 `items`에서 경력 (`period`, `title`), `journeyPhoto`에서 사진 경로와 대체텍스트 수정
- **7대 대표공약**: `data.js`의 `pledges7` 배열에서 공약을 관리하고, 각 `details` 배열에 `{ title, description }` 형식의 확정된 세부 공약을 추가 (미입력 항목은 사이트에서 준비 중으로 표시)
- **캠퍼스 환경개선 영상**: `data.js`의 `campusVideo.src`, `intro` 수정
- **공약 카드뉴스**: `data.js`의 `cardNews` 배열에 `{ src: './president_assets/파일명.jpg', alt: '설명' }` 추가
- **소견서 본문**: `statement.html`의 `#statement-content` 영역 활성화 및 내용/PDF 등록
- **다운로드 파일**: `president_assets` 폴더에 PDF를 넣고 `downloads` 항목의 `url`에 './president_assets/파일명.pdf' 입력. 소견서 항목(`id: 'statement'`)의 URL은 홈 버튼에도 사용됨. Cloudflare 배포에 새 파일을 포함하려면 `scripts/prepare-review-assets.mjs`의 허용 목록에도 추가

## Cloudflare 비밀번호 보호 검토 사이트

Cloudflare Worker는 `workers.dev`, `namjin.kr` Custom Domain, Cloudflare 프록시가 켜진 `www.namjin.kr/*` Route에서 같은 모드 정책을 적용합니다. `SITE_MODE`가 정확히 `public`일 때만 공개되며, 값이 `review`이거나 누락·오타이면 모두 HTTP Basic 인증이 필요합니다. 브라우저 기본 인증 창에는 아이디와 비밀번호 입력란이 함께 나타납니다.

### 로컬 실행

Node.js 22.12.0 이상을 설치한 뒤 프로젝트 루트에서 실행합니다.

```powershell
npm install
npm run test:review
```

로컬 인증 테스트용 값만 `.dev.vars`에 저장하고 개발 서버를 실행합니다. 운영용 비밀번호를 이 파일에 복사하지 마세요.

```powershell
@'
SITE_MODE="review"
REVIEW_USERNAME="local-review"
REVIEW_PASSWORD="local-test-only"
'@ | Set-Content -Encoding ascii .dev.vars
npm run dev:review
```

개발 서버는 `http://localhost:8787`에서 열립니다. `.dev.vars`에 `SITE_MODE`가 없으면 검토 모드로 동작합니다. 검토 모드에서 인증 Secret이 없거나 비어 있으면 Worker가 `503`으로 파일 제공을 차단합니다. 로컬 검토는 Cloudflare에 배포하지 않으며, `npm run build:review`는 허용 목록의 파일만 `dist/review-site/`에 복사합니다.

### Cloudflare 첫 배포

`npm install` 후 아래 순서로 실행합니다. 로그인은 브라우저에서 Cloudflare 계정을 승인하며, `secret put`은 터미널에서 각각 비공개로 값을 입력합니다. Secret 값을 명령줄 인자, 소스 파일, 채팅에 적지 마세요.

```powershell
npx wrangler login
npm run deploy:review
npx wrangler secret put REVIEW_USERNAME --config wrangler.jsonc
npx wrangler secret put REVIEW_PASSWORD --config wrangler.jsonc
```

Worker는 `workers.dev`, `namjin.kr` Custom Domain, 그리고 Cloudflare 프록시된 `www.namjin.kr/*` Route를 사용하며 버전 미리보기 URL은 비활성화되어 있습니다. 기존 `REVIEW_USERNAME`, `REVIEW_PASSWORD` Secret은 유지합니다. `SITE_MODE`를 아직 만들지 않았거나 값이 잘못되면 검토 모드로 잠깁니다. Wrangler로 코드를 다시 배포해도 대시보드에서 관리하는 Secret은 유지됩니다.

### Cloudflare 자동 배포 설정

Worker의 **Settings → Builds**에서 자동 배포 설정을 다음과 같이 유지합니다.

- Git repository: `dockzone22/vote_namjin`
- Production branch: `main`
- Root directory: `/`
- Build command: `npm run build:review`
- Deploy command: `npx wrangler deploy --config wrangler.jsonc`

Build command가 정적 허용 파일을 `dist/review-site/`에 준비한 후 Deploy command가 Worker를 배포합니다. 이 설정은 Cloudflare 대시보드에서 관리하며 `wrangler deploy`로 콘텐츠를 수동 배포해도 자동으로 덮어써지지 않습니다.

### 공개하기

Cloudflare 대시보드에서 수동으로 전환합니다.

1. **Workers & Pages → Overview → `vote-namjin-review` → Settings → Variables and Secrets**로 이동합니다.
2. **Add → Secret**을 선택하고 이름에 `SITE_MODE`, 값에 `public`을 입력합니다. 이미 Secret이 있으면 **Edit**에서 값을 `public`으로 바꿉니다.
3. **Deploy**를 눌러 적용합니다. 이후 세 호스트에서 인증 없이 접속할 수 있습니다.

공개 모드에서는 응답의 검색 차단 헤더를 제거하고 HTML robots 메타를 `index, follow`, `robots.txt`를 `Allow: /`로 맞춥니다. 캐시 전환 방지를 위해 응답은 공개 모드에서도 `private, no-store`입니다.

### 다시 잠그기

같은 **Settings → Variables and Secrets → Edit**에서 `SITE_MODE` 값을 `review`로 바꾸고 **Deploy**를 누릅니다. Secret을 삭제해도 기본값은 검토 모드지만, 실수 방지를 위해 `review`를 명시하는 것을 권장합니다. 검토 모드는 모든 호스트와 정적 파일에 Basic 인증, `noindex, nofollow`, `Disallow: /`를 적용합니다.

Worker는 두 모드 모두 `private, no-store` 응답을 보내므로 브라우저·공유 캐시에 이전 공개 응답이 남지 않도록 합니다. 이미 방문자가 저장하거나 내려받은 사본까지 회수할 수는 없습니다.

### 사이트 수정 후 배포하기

코드·콘텐츠를 수정한 뒤 프로젝트 루트에서 아래 명령을 실행합니다.

```powershell
npm run deploy:review
```

이 명령은 허용 목록 파일을 준비하고 Worker 코드를 배포합니다. Cloudflare의 `SITE_MODE`와 기존 인증 Secret은 덮어쓰지 않으므로, 배포 전환 없이 현재 모드가 유지됩니다. 공개로 바꾸거나 다시 잠글 때만 대시보드에서 Secret 값을 수정하고 **Deploy**를 누릅니다.

### 업로드 범위와 검색 제외

업로드 대상은 `index.html`, `statement.html`, `styles.css`, `data.js`, `app.js`, `president_assets/jin_nam.jpg`, `president_assets/교수님니트_가장긴거.jpg`, `president_assets/261124_입후보소견서.pdf`로 제한됩니다. 원본 엑셀, 미리보기 이미지, 미사용 현장 사진, 설정 파일, Worker 소스, 비밀 파일은 정적 파일 폴더에 복사되지 않습니다. Cloudflare Workers Static Assets의 현재 개별 파일 제한은 25 MiB이며, 준비 스크립트가 허용 목록 파일의 크기를 확인합니다.

Worker가 응답 시점에 두 HTML 페이지의 robots 메타 태그를 선택한 모드에 맞게 바꾸므로 모드 전환 때 정적 파일 재빌드는 필요하지 않습니다. `/robots.txt`도 모드별로 Worker가 제공합니다. 공개 모드는 인증·검색 차단을 모두 해제하므로, 공개 시점이 확정되었을 때만 전환하세요. `www` DNS 레코드의 Cloudflare 프록시 상태를 끄면 Worker Route가 요청을 가로채지 못합니다.
