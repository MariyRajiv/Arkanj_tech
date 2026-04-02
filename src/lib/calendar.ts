/**
 * Generates and downloads an .ics file for a calendar event.
 */
export function addToCalendar(event: {
  title: string;
  description: string;
  startDate: Date;
  durationInMinutes: number;
}) {
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const endDate = new Date(event.startDate.getTime() + event.durationInMinutes * 60000);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Arkanj Tech Solutions//NONSGML Event//EN',
    'BEGIN:VEVENT',
    `UID:${Math.random().toString(36).substring(2)}@arkanj.tech`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(event.startDate)}`,
    `DTEND:${formatDate(endDate)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
