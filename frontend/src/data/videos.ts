export interface Video {
  id: string
  title: string
  uploadDate: string
  description: string
  videoUrl: string
}

// Convert Google Drive sharing URL to direct streaming URL
const getGoogleDriveDirectUrl = (url: string) => {
  const fileId = url.match(/\/d\/([^/]+)/)?.[1]
  if (!fileId) return url
  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

export const localVideos: Video[] = [
  {
    id: '1',
    title: "INDIA'S GOT LATENT EP 01 ft. Raftaar",
    uploadDate: '2024-02-14',
    description: 'Episode 1 featuring Raftaar',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1rUbB_oAdeBqjHxjNkGYui0BuObwQeBsQ/view?usp=sharing")
  },
  {
    id: '2',
    title: "INDIA'S GOT LATENT EP 02 ft. Gamer Fleet, Joke Singh & Karan Singh Magic",
    uploadDate: '2024-02-14',
    description: 'Episode 2 featuring GamerFleet, Joke Singh, and Karan Singh Magic',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1rF1U48pTyMTNVzjQ7uQ5kfdfsNVhk_Ew/view?usp=sharing")
  },
  {
    id: '3',
    title: "INDIA'S GOT LATENT EP 03 ft. Urfi Javed",
    uploadDate: '2024-02-14',
    description: 'Episode 3 featuring Urfi Javed, Ashish Solanki, and Yash Raj',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1T8YJXfNBQABrShJsNDuU0qJEnOpu1331/view?usp=sharing")
  },
  {
    id: '4',
    title: "INDIA'S GOT LATENT EP 04 ft. Comedian Maheep Singh",
    uploadDate: '2024-02-14',
    description: 'Episode 4 featuring Comedian Maheep Singh, Amit Tandon, and Neeti Palta',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1Z9lOe86mlAC9qjnMlfTfuRyRAD1NSWEu/view?usp=sharing")
  },
  {
    id: '5',
    title: "INDIA'S GOT LATENT EP 05 ft. Kunal Kamra",
    uploadDate: '2024-02-14',
    description: 'Episode 5 featuring Kunal Kamra and Atul Khatri',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1dzeFgY9g58ZaNVgDK5rbi-c5Q-939671/view?usp=sharing")
  },
  {
    id: '6',
    title: "INDIA'S GOT LATENT EP 06 ft. Vipul Goyal",
    uploadDate: '2024-02-14',
    description: 'Episode 6 featuring Vipul Goyal, Joke Singh, and Sonali Thakker',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1s7i-9oxKyUgI4xr2w2H7iueu0_4aDMSe/view?usp=sharing")
  },
  {
    id: '7',
    title: "INDIA'S GOT LATENT EP 07 ft. Ravi Gupta",
    uploadDate: '2024-02-14',
    description: 'Episode 7 featuring Ravi Gupta, Rahgir, and Saurabh',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1ubJw5V928AINybYY_aArsX86eTNS6RFU/view?usp=sharing")
  },
  {
    id: '8',
    title: "INDIA'S GOT LATENT EP 08 ft. Poonam Pandey",
    uploadDate: '2024-02-14',
    description: 'Episode 8 featuring Poonam Pandey, Vidit Chess, and Vivek Magic',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/10W46lBlOSU72Qewe1KCJTuQRfphEVELt/view?usp=sharing")
  },
  {
    id: '9',
    title: "INDIA'S GOT LATENT EP 09 ft. Deepak Kalal",
    uploadDate: '2024-02-14',
    description: 'Episode 9 featuring Deepak Kalal, Manan Desai, and Stan Boss',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1XS6JLMxeFv7thN7XZm39FLXkPsCA2hEQ/view?usp=sharing")
  },
  {
    id: '10',
    title: "INDIA'S GOT LATENT EP 10 ft. Raghu Ram",
    uploadDate: '2024-02-14',
    description: 'Episode 10 featuring Raghu Ram, Tanmay Bhat, and Sid Warrier',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1Dc013hgeX-rqgJ6n1dCmdz1E7k9MEq7F/view?usp=sharing")
  },
  {
    id: '11',
    title: "INDIA'S GOT LATENT EP 11 ft. Bharti TV",
    uploadDate: '2024-02-14',
    description: 'Episode 11 featuring Bharti TV, Limbachiyaa, and Tony Kakkar',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1QGuh9t6HLMPJ4sRDfjqJhTvfxXuJrczp/view?usp=sharing")
  },
  {
    id: '12',
    title: "INDIA'S GOT LATENT EP 12 ft. Rakhi Sawant",
    uploadDate: '2024-02-14',
    description: 'Episode 12 featuring Rakhi Sawant, Ashish Solanki, and Comedian Maheep Singh',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/17mGLQFxlpfzn5lc4iyBlYysHYzA1vvSk/view?usp=sharing")
  },
  {
    id: '13',
    title: "INDIA'S GOT LATENT ft. Aakash Gupta",
    uploadDate: '2024-02-14',
    description: 'Special episode featuring Aakash Gupta',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1yLPWJnw3F8cXY9RKfMLQAs2DOs6RZ8UF/view?usp=sharing")
  },
  {
    id: '14',
    title: "INDIA'S GOT LATENT ft. Arpit Bala & Team",
    uploadDate: '2024-02-14',
    description: 'Special episode featuring Arpit Bala, Bappa, Sahil and Amin',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1GWqFeCyHObEgb7sOyMnYFwqoEigwPK9p/view?usp=sharing")
  },
  {
    id: '15',
    title: "INDIA'S GOT LATENT ft. Avika & Team",
    uploadDate: '2024-02-14',
    description: 'Special episode featuring Avika, Devesh, and Shashwat',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1SbaEtEFqRPR7Z3fjZXp62iH9_F34vFbp/view?usp=sharing")
  },
  {
    id: '16',
    title: "INDIA'S GOT LATENT ft. Beer Biceps",
    uploadDate: '2024-02-14',
    description: 'Special episode featuring Beer Biceps and Ashish Chanchlani',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1y3Hje58wrT7ukSW3Qvplctapk4zjKjyC/view?usp=sharing")
  },
  {
    id: '17',
    title: "INDIA'S GOT LATENT ft. Calm & Team",
    uploadDate: '2024-02-14',
    description: 'Special episode featuring Calm, Encore, Madhur, and Kaustub',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1QKMvMTpLlzOKY2ZyuEqbIO85kTMQc8C9/view?usp=sharing")
  },
  {
    id: '18',
    title: "INDIA'S GOT LATENT - Deepak Kalal Deleted Moments",
    uploadDate: '2024-02-14',
    description: 'Special deleted moments featuring Deepak Kalal',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1NBUBTUCXae6Omtl6JQbQEpOm3MLWnxj6/view?usp=sharing")
  },
  {
    id: '19',
    title: "INDIA'S GOT LATENT - Deleted Clips 1",
    uploadDate: '2024-02-14',
    description: 'Collection of deleted clips from various episodes',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1C2QyD_L2ZGBoWGk-o6VKZ4xWqqA1lF_L/view?usp=sharing")
  },
  {
    id: '20',
    title: "INDIA'S GOT LATENT Bonus Episode ft. Rohan Joshi & Team",
    uploadDate: '2024-02-14',
    description: 'Bonus episode featuring Rohan Joshi, Sahil, Vaibhav, and Chandni',
    videoUrl: getGoogleDriveDirectUrl("https://drive.google.com/file/d/1m1bNixCZYmdnUBNoO8ysLBCYG6sKt_Bg/view?usp=sharing")
  }
] 