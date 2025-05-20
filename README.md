# decimal-calculator

### 겪었던 고충 1. 긴 숫자 읽기

1. 터미널로 스크립트 돌려서 조회를 한다.
2. 겁나 긴 숫자가 나온다
3. 얼만지 알고싶다.
4. 계산기 찾으러 웹사이트로 간다.
   1. 아니면 그냥 계산기를 켠다.
5. 데시멀 18이면 10^18로 나눴다.
6. 근데 USDC 나 USDT 면 데시멀 몇이었는지 찾아봐야 함.
7. 여기서부터 귀찮음.

### 겪었던 고충 2. 짧은 숫자 늘리기

1. 짧은 숫자에 10^18 붙이고 싶은 상황이 몇번 있음.
2. 테스트코드 짤 때? 아니면 이더스캔에서 인터랙션 할 때?
3. 계산기 키는거 위와 비슷.

### 겪었던 고충 3. 각종 데시멀이 다르다.

- USDT는 대부분 체인에서 6(맞나?)
- USDC도 6?
- BTC는 8;
- TON 의 경우, 데시멀이 다르다. 9 였나 그랬음.
- TON USDT 는 또 6이다.

### 내 불편함을 해결할 시나리오 & 디자인 & 스펙

1. 간단한 인터페이스. 뭐가 잔뜩 있으면 별로.
   1. 인풋, 아웃풋이 크게 딱!
   2. 다른 잡다한 정보 없어야 한다.
   3. 양옆에는 약간 공간을 둬서, 광고가 들어갈 수 있게 한다.
2. 변환시, 토큰을 고를 수 있다.
   1. 디폴트는 ERC20이나, 다른 체인의 경우도 선택할 수 있도록 직관적인 인터페이스 필요함.
   2. 토큰을 선택하는 드롭다운 하나 있고
   3. 그 밑에는 이더리움, 비트코인, 톤, 수이 등 아이콘 형태가 있고, 클릭하면 해당 체인에 해당하는 decimal로 형태.
3. 정확한 정보인지 내가 직접 눈으로 확인하기 위해 사이트 하단에 토글로 정보가 있으면 좋겠다.
   1. SEO 를 위해서도 좋다.
   2. 토글 버튼 누르면 정보 보여줌.
4. 구글 애널리틱스가 붙어있어야 하며, SEO 를 위해 메타 태그 등을 추가해야 한다.
5. 모바일 환경에서도 사용 가능해야 한다.
6. 디자인은 모던하게 하고, 최대한 간단한 디자인을 따라가려고 한다.
7. 어떠한 환경에서도 빠르게 작동해야 한다: 즉 무거운 라이브러리 사용은 자제한다.(viem 사용하되 필요한 파트만 적절히 차용. 리액트 대신 바닐라 타입스크립트나 그 외 다른 가벼운 라이브러리 채택)
8. Bigint 를 다루기 때문에 주의해야 한다.

### 특이한 소수점 조사 결과

| **체인**             | **토큰**         | **소수점 자리수 (Decimals)** | **참고 링크**                                                 |
| -------------------- | ---------------- | ---------------------------- | ------------------------------------------------------------- |
| 이더리움 (Ethereum)  | ETH              | 18                           | “1 Ether = 10^18 wei” (ETH has 18 decimal places)             |
| 이더리움 (Ethereum)  | USDT (ERC-20)    | 6                            | USDT ERC-20 토큰의 소수점은 6자리                             |
| 이더리움 (Ethereum)  | USDC (ERC-20)    | 6                            | USDC ERC-20 토큰의 소수점은 6자리                             |
| 이더리움 (Ethereum)  | DAI (ERC-20)     | 18                           | DAI 스테이블코인은 18자리 소수점을 사용                       |
| 이더리움 (Ethereum)  | LINK (ERC-20)    | 18                           | 체인링크 토큰은 18자리 소수점을 가짐                          |
| 이더리움 (Ethereum)  | AAVE (ERC-20)    | 18                           | 에이브 토큰은 18자리 소수점을 가짐                            |
| BNB 체인 (BNB Chain) | BNB              | 8                            | BNB 코인의 최소 단위 ‘jager’는 0.00000001 BNB (8 decimals)    |
| BNB 체인 (BNB Chain) | USDT (BEP-20)    | 18                           | 바이낸스 페그 USDT 토큰은 18자리 소수점 사용                  |
| BNB 체인 (BNB Chain) | USDC (BEP-20)    | 18                           | 바이낸스 페그 USDC 토큰은 18자리 소수점 사용                  |
| BNB 체인 (BNB Chain) | BUSD (BEP-20)    | 18                           | BUSD 스테이블코인은 18자리 소수점을 가짐                      |
| BNB 체인 (BNB Chain) | LINK (BEP-20)    | 18                           | 체인링크(BEP-20) 토큰도 18자리 소수점                         |
| 아발란체 (Avalanche) | AVAX             | 9                            | 1 nanoAVAX = 10^-9 AVAX (AVAX has 9 decimal places)           |
| 아발란체 (Avalanche) | USDT (ERC-20)    | 6                            | 테더 USDT (Avalanche ERC-20) 소수점 6자리                     |
| 아발란체 (Avalanche) | USDC (ERC-20)    | 6                            | USD Coin (Avalanche ERC-20) 소수점 6자리                      |
| 아발란체 (Avalanche) | DAI (ERC-20)     | 18                           | 다이 DAI (Avalanche ERC-20) 소수점 18자리                     |
| 아발란체 (Avalanche) | LINK (ERC-20)    | 18                           | 체인링크 (Avalanche) 토큰 소수점 18자리                       |
| 폴리곤 (Polygon)     | MATIC            | 18                           | MATIC 토큰은 18자리 소수점 (1e18 Wei = 1 MATIC)               |
| 폴리곤 (Polygon)     | USDT (ERC-20)    | 6                            | 테더 USDT (Polygon) 토큰 소수점 6자리                         |
| 폴리곤 (Polygon)     | USDC (ERC-20)    | 6                            | USD Coin (Polygon) 토큰 소수점 6자리                          |
| 폴리곤 (Polygon)     | DAI (ERC-20)     | 18                           | 다이 DAI (Polygon) 토큰 소수점 18자리                         |
| 폴리곤 (Polygon)     | LINK (ERC-20)    | 18                           | 체인링크 (Polygon) 토큰 소수점 18자리                         |
| 폴리곤 (Polygon)     | AAVE (ERC-20)    | 18                           | 에이브 AAVE 토큰 소수점 18자리                                |
| 아비트럼 (Arbitrum)  | ARB              | 18                           | 아비트럼 네이티브 토큰 ARB의 소수점 18자리                    |
| 아비트럼 (Arbitrum)  | USDT (Arb-ERC20) | 6                            | USDT (Arbitrum) 토큰 소수점 6자리                             |
| 아비트럼 (Arbitrum)  | USDC (Arb-ERC20) | 6                            | USDC (Arbitrum) 토큰 소수점 6자리                             |
| 아비트럼 (Arbitrum)  | DAI (Arb-ERC20)  | 18                           | 다이 DAI (Arbitrum) 토큰 소수점 18자리                        |
| 아비트럼 (Arbitrum)  | LINK (Arb-ERC20) | 18                           | 체인링크 (Arbitrum) 토큰 소수점 18자리                        |
| 옵티미즘 (Optimism)  | OP               | 18                           | 옵티미즘 네이티브 토큰 OP의 소수점 18자리                     |
| 옵티미즘 (Optimism)  | USDC (OP-ERC20)  | 6                            | USDC (Optimism) 토큰 소수점 6자리                             |
| 옵티미즘 (Optimism)  | DAI (OP-ERC20)   | 18                           | 다이 DAI (Optimism) 토큰 소수점 18자리                        |
| 옵티미즘 (Optimism)  | LINK (OP-ERC20)  | 18                           | 체인링크 (Optimism) 토큰 소수점 18자리                        |
| 솔라나 (Solana)      | SOL              | 9                            | 1 Lamport = 0.000000001 SOL (SOL has 9 decimals)              |
| 솔라나 (Solana)      | USDT (SPL)       | 6                            | 테더 USDT (Solana) 토큰 소수점 6자리                          |
| 솔라나 (Solana)      | USDC (SPL)       | 6                            | USD Coin (Solana) 토큰 소수점 6자리                           |
| 솔라나 (Solana)      | SRM (Serum)      | 6                            | Serum (솔라나 DEX 토큰) 소수점 6자리                          |
| 앱토스 (Aptos)       | APT              | 8                            | APT 코인은 8자리 소수점 (1 Octa = 10^-8 APT)                  |
| 앱토스 (Aptos)       | USDC (APT-os)    | 6                            | USDC (Aptos) 토큰 소수점 6자리                                |
| 수이 (Sui)           | SUI              | 9                            | SUI 코인의 최소 단위 MIST = 10^-9 SUI (9 decimals)            |
| 톤 (TON)             | TON (Toncoin)    | 9                            | 1 TON = 1,000,000,000 nanoTON (TON has 9 decimals)            |
| 카르다노 (Cardano)   | ADA              | 6                            | 1 ADA = 1,000,000 Lovelace (ADA has 6 decimal places)         |
| 카르다노 (Cardano)   | DJED             | 6                            | Cardano 기반 스테이블코인 DJED의 소수점 6자리                 |
| 비트코인 (Bitcoin)   | BTC              | 8                            | 1 BTC = 100,000,000 Satoshis (BTC has 8 decimals)             |
| 비트코인 (Bitcoin)   | USDT (Omni)      | 8                            | Omni 프로토콜의 USDT 토큰은 8자리 소수점 (divisible property) |

### Action items

- [ ]
