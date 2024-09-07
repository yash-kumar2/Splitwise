import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Activities= () => {
  const [activities, setActivities] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const BASEURL = 'http://localhost:3000';

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${BASEURL}/activity`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">Activity</Typography>
      <Grid container spacing={3}>
        {activities.map((activity, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{activity.description}</Typography>
                <Typography variant="body1">
                  {activity.type === 'paid' 
                    ? `You paid ${activity.for} ${activity.amount}`
                    : `${activity.owner} paid you ${activity.amount}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  In group: {activity.groupName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date: {new Date(activity.date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Activities;