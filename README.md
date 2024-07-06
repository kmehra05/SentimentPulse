# SentimentPulse

## Project Description

SentimentPulse is a full-stack web application designed to analyze and visualize the sentiment of the most recent news headlines on a given topic in real-time. Users can enter a keyword or hashtag to fetch recent headlines, which are then analyzed for sentiment using IBM NLU. The results are displayed in an interactive dashboard.


https://github.com/kmehra05/SentimentPulse/assets/17500616/25f273ac-609e-4aa8-a72c-a9ff5af3ec68

## Running in Production

Access the application at: [SentimentPulse Production](http://ec2-3-19-239-222.us-east-2.compute.amazonaws.com:8080/)

## Features

- **User Input:** Allows for keyword/topi input
- **Sentiment Analysis:** Uses IBM NLU to analyze headline sentiments and compound an overall sentiment score.
- **Visualization:**
  - Pie chart displaying negative, neutral, and positive headlines.
  - Historical sentiment graph showing trends over time.

## Tech Stack

- **Frontend:** Vite + React.js
- **Backend:** Node.js with Express
- **Database:** MongoDB Atlas
- **Machine Learning:** IBM NLU
- **Hosting:** AWS EC2

## Running Locally

### Frontend

1. Rename `.env.example` to `.env` and add API keys.
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Backend

1. Rename `.env.example` to `.env` and add API keys.
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## Limitations and Scalability

While SentimentPulse is highly functional in its current state, there are a few limitations and areas for improvement:

- **IBM NLU Subscription:** The accuracy and speed of sentiment analysis can be significantly enhanced by upgrading to a higher-tier subscription of IBM NLU. The free tier has certain limitations on the number of requests, making the compound sentiment score less accurate than if there were more data provided.
- **Scalability:** SentimentPulse is built with scalability in mind. The use of AWS EC2 for hosting allows easy scaling of the server infrastructure as demand grows. Additionally, MongoDB Atlas provides scalable database solutions that can handle increasing data volumes seamlessly.
- **Future Enhancements:** Potential improvements include integrating additional data sources, refining the sentiment analysis algorithms, and enhancing the UI for better user experience.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
