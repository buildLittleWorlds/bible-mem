# Bible Memory Palace

Bible Memory Palace is a web application designed to help users memorize Bible verses using the memory palace technique combined with spaced repetition.

## 🎯 For Users

### What is Bible Memory Palace?

Bible Memory Palace is a tool that helps you memorize Bible verses more effectively. It uses two powerful techniques:

1. **Memory Palace**: This technique involves associating each verse with a specific image (a painting) and location (locus). This creates strong visual memories, making verses easier to recall.

2. **Spaced Repetition**: The app schedules reviews of your verses at optimal intervals. As you become more confident with a verse, the time between reviews increases.

### How to Use

1. **Add Verses**: Start by adding verses you want to memorize. For each verse, you'll provide:
   - The Bible reference (book, chapter, verse)
   - A painting to associate with the verse
   - The artist of the painting
   - A description of a specific location or detail in the painting (locus)

   Note: The system automatically associates paintings with specific hex ranges. Each painting corresponds to a range of 16 loci (xxx0:xxxF in hex), where xxx represents any three hex digits.

2. **Review**: Regularly check the app for verses due for review. During review:
   - You'll see the painting(s) and locus description(s) associated with the verse or passage
   - Try to recall the verse(s)
   - Rate your confidence in your recall

   You can review individual verses or entire passages. The system will automatically determine which painting(s) to display based on the hex range of the verses being reviewed.

3. **Track Progress**: The dashboard shows your overall progress, including:
   - Total verses memorized
   - Verses due for review
   - Recent activity

### Understanding the Hex Range System

The Bible Memory Palace uses a hexadecimal system to encode verse references and associate them with paintings and loci:

- Each half-verse is assigned a unique hex code.
- Hex codes in the range xxx0:xxxF (where xxx is any three hex digits) are always associated with the same painting.
- This means that a single painting is linked to 16 consecutive loci.
- When reviewing a passage, the system automatically determines which painting(s) to display based on the hex range of the verses in the passage.
- For example, if you review verses with hex codes from 239B through 23B8, the system will display three paintings: one for range 2390:239F, one for 23A0:23AF, and one for 23B0:23BF.

This system ensures a consistent association between verses, paintings, and loci, allowing for flexible review of both individual verses and longer passages.

## 🖥️ For Developers

### Technical Stack

- **Frontend**: Astro, React, Tailwind CSS
- **Backend**: Astro API routes (serverless functions)
- **Database**: Supabase (PostgreSQL)

### Database Structure

The app uses a single table `bible_master` in Supabase with the following key columns:

| Column                  | Type      | Description                                    |
|-------------------------|-----------|------------------------------------------------|
| id                      | integer   | Unique identifier for each verse               |
| decimal_code            | integer   | Numeric encoding for verse reference           |
| hex_code                | text      | Hexadecimal encoding for verse reference       |
| book                    | text      | Bible book name                                |
| chapter                 | integer   | Chapter number                                 |
| verse                   | text      | Verse number (can include 'a' or 'b' for half verses) |
| painting                | text      | Name of the associated painting                |
| artist                  | text      | Name of the painting's artist                  |
| painting_url            | text      | URL to the painting image                      |
| locus_description       | text      | Description of the specific location in the painting |
| original_text           | text      | The text of the verse                          |
| memorization_started_at | timestamp | When memorization of this verse began          |
| last_reviewed_at        | timestamp | When the verse was last reviewed               |
| next_review_at          | timestamp | When the verse is due for next review          |
| confidence_level        | integer   | User's confidence level (0-5)                  |
| review_count            | integer   | Number of times the verse has been reviewed    |
| ease_factor             | float     | Factor used in spaced repetition algorithm     |
| interval                | integer   | Days until next review                         |

### Key Components

1. **src/pages/index.astro**: Home page
2. **src/pages/add-verse.astro**: Page for adding new verses
3. **src/pages/review.astro**: Page for reviewing verses
4. **src/pages/dashboard.astro**: User's dashboard
5. **src/components/VerseDetailForm.astro**: Form for adding/editing verse details
6. **src/pages/api/update-verse-detail.ts**: API route for updating verse details
7. **src/pages/api/submit-review.ts**: API route for submitting verse reviews

### Spaced Repetition Algorithm

The app uses a modified version of the SuperMemo SM-2 algorithm. Key points:

- After each review, the user provides a confidence rating (0-5)
- Based on this rating, the `ease_factor` and `interval` are adjusted
- The `next_review_at` is set based on the new interval

### Hex Range System Implementation

The hex range system is a core feature of the Bible Memory Palace app:

1. **Hex Code Assignment**: Each half-verse is assigned a unique hex code.
2. **Painting Association**: Paintings are associated with ranges of 16 hex codes (xxx0:xxxF).
3. **Locus Mapping**: Each hex code within a painting's range corresponds to a specific locus in that painting.
4. **Review Logic**: When fetching verses for review, the system determines which painting(s) to display based on the hex codes of the verses being reviewed.
5. **Flexible Passage Review**: The system can handle reviews of single verses or longer passages spanning multiple paintings.

When implementing new features or modifying existing ones, ensure that this hex range system is respected and utilized appropriately.

### Adding New Features

To add new features:

1. Understand the existing components and their interactions
2. Modify the database schema if necessary
3. Create new Astro pages or components as needed
4. Implement new API routes for any backend functionality
5. Update the UI to incorporate the new feature
6. Ensure the spaced repetition logic is maintained or extended as necessary

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables for Supabase connection
4. Run the development server: `npm run dev`

## 🧞 Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 🔮 Future Features

The following features are planned for future development, listed in order of implementation priority and complexity:

1. **Verse Grouping by Hex Ranges**
   - Implement functionality to group consecutive verses using hex ranges
   - Allow users to reference and memorize entire passages, not just single verses
   - Update the database schema and API to support verse ranges

2. **Scholarly Study Tags**
   - Add a tagging system for verses
   - Enable users to create custom tags for academic or thematic grouping
   - Implement a UI for adding, editing, and viewing tagged verse collections
   - Update the database schema to include a tags table and verse-tag relationships

3. **AI-Enhanced Locus Suggestions**
   - Integrate an AI model to suggest locus descriptions based on verse content and chosen painting
   - Implement an API endpoint for AI-generated suggestions
   - Update the verse addition UI to include AI-suggested loci

4. **Advanced Visual Presentation for Hebrew and Greek Texts**
   - Develop a sophisticated layout system for displaying Hebrew and Greek texts
   - Implement larger, more readable fonts for original language texts
   - Create a clear and visually appealing method for marking verse and chapter numbers
   - Design an elegant, user-friendly interface for reviewing longer passages in connection with paintings
   - Ensure responsive design for various screen sizes while maintaining readability
   - Integrate options for adjusting text size and layout to user preferences
   - Implement smooth scrolling and navigation for longer passages
   - Optimize rendering performance for handling complex scripts and larger text blocks

These features will be developed exclusively for personal study use, focusing on localhost and terminal-based interactions. The app will maintain its core focus on image and text-based memorization techniques, with an enhanced emphasis on the visual presentation of original language texts for a more immersive and effective study experience.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](link-to-issues-page).

## 📝 License

[MIT License](link-to-license-file)