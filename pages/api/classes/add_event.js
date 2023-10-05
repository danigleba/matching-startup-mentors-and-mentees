import { google } from 'googleapis';
import { auth } from "@/utils/firebase";

// Initialize the Google Calendar API
const calendar = google.calendar('v3');

export default async (req, res) => {
  const tutor_email = req.query.tutor_email;
  const student_email = req.query.student_email;
  const idToken = req.headers.authorization; // Get the Firebase ID token from headers
  // Check if the user is authenticated using the ID token
  if (!idToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    // Create the event
    await calendar.events.insert({
      auth: idToken, // Pass the ID token directly
      calendarId: 'primary',
      resource: {
        summary: 'Tutoring Session',
        description: 'Tutoring session with a student',
        start: {
          dateTime: '2023-10-05T10:00:00', // Adjust the date and time
        },
        end: {
          dateTime: '2023-10-05T11:00:00', // Adjust the date and time
        },
        attendees: [
          { email: tutor_email },
          { email: student_email },
        ],
      },
    });

    res.status(200).json({ message: 'Event created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating event' });
  }
};

