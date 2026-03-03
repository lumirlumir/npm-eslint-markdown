# Copilot Instructions

## 기본 작업 원칙

- 이 저장소는 `npm workspaces` 기반 모노레포입니다.
- 패키지 코드는 `packages` 디렉터리, 문서는 `website` 디렉터리에서 작업합니다.
- 변경은 가능한 한 작고 명확하게 유지합니다.
- 코드 변경 시 기존 스크립트(`npm run lint`, `npm run test`, 필요 시 `npm run build`)로 검증합니다.

## 커밋 메시지 규칙

- 커밋 메시지는 아래 형식을 사용합니다.

  ```text
  <type>[optional scope]: <description>
  ```

- 예시:
  - `feat(rules): add no-foo rule`
  - `fix(parser): handle empty code block`
  - `docs: update contributing guide`
- 설명(`description`)은 간결하고 명령형으로 작성합니다.

## 언어 규칙

- 커밋 제목, PR 설명, 이슈/코드 리뷰 코멘트 등 모든 설명 문구는 영어로 작성합니다.
