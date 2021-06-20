import React, { useState, useCallback } from 'react';
import Container from './components/Container';
import FeedbackOptions from './components/FeedbackOptions';
import Section from './components/Section';
import Statistics from './components/Statistics';
import Notification from './components/Notification';
import './App.css';

export default function App() {
    const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });
    const { good, neutral, bad } = feedback;

    const handleFeedback = useCallback(e => {
        const feedbackValue = e.target.value;

        setFeedback(prevState => ({
            ...prevState,
            [feedbackValue]: prevState[feedbackValue] + 1,
        }));
    }, []);

    const countTotalFeedback = () => {
        return good + neutral + bad;
    };

    const countPositiveFeedbackPercentage = () => {
        const positivePercentage = Math.round(
            (good / countTotalFeedback()) * 100,
        );
        return positivePercentage ? positivePercentage : 0;
    };

    const keys = Object.keys(feedback);

    return (
        <Container>
            <Section title="Please leave feedback">
                <FeedbackOptions
                    options={keys}
                    onLeaveFeedback={handleFeedback}
                />
            </Section>
            <Section title="Statistics">
                {countTotalFeedback() > 0 ? (
                    <Statistics
                        good={good}
                        neutral={neutral}
                        bad={bad}
                        total={countTotalFeedback()}
                        positivePercentage={countPositiveFeedbackPercentage()}
                    />
                ) : (
                    <Notification message="No feedback given" />
                )}
            </Section>
        </Container>
    );
}
