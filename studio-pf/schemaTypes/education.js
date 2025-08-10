// schemas/education.js
export default {
    name: 'education',
    title: 'Education',
    type: 'document',
    fields: [
      {
        name: 'institution',
        title: 'Institution',
        type: 'string',
        description: 'Name of the school, university, or training center'
      },
      {
        name: 'degree',
        title: 'Degree / Program',
        type: 'string',
        description: 'E.g., Bachelor of Science in Computer Science'
      },
      {
        name: 'startDate',
        title: 'Start Date',
        type: 'date',
        options: {
          dateFormat: 'YYYY-MM-DD'
        }
      },
      {
        name: 'endDate',
        title: 'End Date',
        type: 'date',
        options: {
          dateFormat: 'YYYY-MM-DD'
        }
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        description: 'Brief summary of coursework, honors, or relevant activities'
      },
      {
        name: 'logo',
        title: 'Institution Logo',
        type: 'image',
        options: { hotspot: true },
        description: 'Upload the logo of your college or institution'
      },
      {
        name: 'order',
        title: 'Order',
        type: 'number',
        description: 'For sorting (lower numbers appear first)'
      }
    ],
    preview: {
      select: {
        title: 'degree',
        subtitle: 'institution',
        media: 'logo'
      }
    }
  }
  