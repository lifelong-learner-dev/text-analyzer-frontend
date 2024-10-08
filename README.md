## 가장 기본적인 화면만 구축

# 2024년 8월 28일 텍스트 분석기 코드 작성 완료(작동 확인)


## 문제점 : 처음에 계획할 때 LangChain과 OpenAI Assistants API로 진행을 하려고 시도하였으나
### 2024년 7월 12일 기준으로 OpenAI 커뮤니티에 Assistants API가 작동이 갑자기 안된다는 글을 올린 것을 발견하고 다른 방향으로 진행
[커뮤니티 글](https://community.openai.com/t/is-the-assistants-api-down/863345)
### LangChain을 이용하여 LLM 2 모델을 통해 진행
### 처음에 Assistants API가 작동되지 않았을 때 해결하기 위해 시간을 너무 오래 끌었으며, 기존에 알고 있었던 것이여서 더욱 당황을 하게 되었다.

###
![작동 화면](https://github.com/lifelong-learner-dev/text_analyzer/blob/main/img/Screenshot%202024-08-28%20at%2022.51.58.png)
### 작동 방식
- 1. 대화형 텍스트 분석기 하단의 입력창에 내용 입력가능
- 2. 입력 후 전송 버튼 클릭
- 3. 대화 내용에 AI와 사용자의 대화 출력
- 4. 분석 버튼 클릭하면, 분석 요청 내용을 적을 수 있는 입력창이 생기며 분석을 원하는 부분에 대한 입력 가능
- 5. 분석 요청 버튼을 클릭하면, 분석 결과 출력