# US Demographic Data Visualization

## Description

This web application visualizes demographic data for the United States using the Data USA API. The project features an interactive histogram displaying the total population and the number of foreign-born citizens for each available year since 2013. Additionally, users can filter by year and explore state-level details.

## Technologies Used

*   **Frontend:**
    *   React with TypeScript
    *   Vite
    *   Material UI
    *   Highcharts with `highcharts-react-official`
    *   axios
    *    `@emotion/react`
    *   `@emotion/styled`
    *   `@mui/icons-material`
*   **API:**
    *   Data USA API: `https://datausa.io/about/api`

## Installation

To run the application locally, follow these steps:

1.  Clone the repository:

    ```bash
    git clone <your-repo-url>
    cd my-demographic-app
    ```

2.  Install the dependencies:

    ```bash
    npm install
    ```

3.  Start the application:

    ```bash
    npm run dev
    ```

4.  Open the application in your browser: `http://localhost:5173`

## Usage

1.  **Histogram Visualization:** The histogram shows the total population and the number of foreign-born citizens for each available year.
2.  **Year Filter:** Use the buttons below the histogram to filter and visualize data for one or more years.
3.  **State Details Table:** Clicking on a bar in the histogram displays a table with state-level information for the selected year.
4.  **State Filter:** Use the autocomplete by state to  filter the histogram and the table by a specific state.

## Author

Fausto Castillo

## Demo
[Live Demo](https://boostup-challenge.web.app/)