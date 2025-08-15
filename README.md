# Power BI-Style Dashboard - Project 1

A TypeScript React application replicating Power BI interface with comprehensive chart configuration panel and Vietnamese city data visualization.

## Features

- **React 18** with TypeScript
- **Redux Toolkit** for complex state management
- **Recharts** for advanced data visualization
- **Lucide React Icons** for rich UI components
- **Power BI-style interface** with collapsible configuration panels
- **Vietnamese cities data** (Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Cần Thơ)
- **Multi-tab layout** (Data, Model, Report tabs)
- **Chart configuration panel** with extensive customization options
- **Interactive chart types**: Bar, Line, and Pie charts
- **Real-time chart updates** through Redux actions

## Getting Started

## Chart Configuration Features

### Data Panel

- **Population data** for major Vietnamese cities
- **Interactive data fields** with field type configuration
- **Remove data functionality** with confirmation
- **Field mapping** for X-axis, Y-axis, and Legend

### Visual Configuration

- **Chart Types**: Bar Chart, Line Chart, Pie Chart
- **Legend Settings**: Show/hide, position (top, bottom, left, right)
- **Title Customization**: Text, font size, alignment, styling
- **Axis Configuration**: Labels, gridlines, formatting
- **Data Labels**: Show/hide, positioning, formatting
- **Color Schemes**: Predefined and custom colors

### Advanced Properties

- **Plot Area**: Background, borders, margins
- **X/Y Axis**: Tick marks, intervals, min/max values
- **Values**: Number formatting, decimal places
- **Layout**: Responsive design options
- **Text Formatting**: Bold, italic, underline options

## Sample Data

The dashboard includes data for 5 major Vietnamese cities:

- **Hà Nội**: 8M population, 3,324 km², 85.2B GDP
- **TP.HCM**: 9M population, 2,095 km², 123.4B GDP
- **Đà Nẵng**: 1.2M population, 1,285 km², 42.1B GDP
- **Hải Phòng**: 2M population, 1,523 km², 38.7B GDP
- **Cần Thơ**: 1.2M population, 1,409 km², 28.9B GDP

### Installation

1. Navigate to the project directory:

   ```bash
   cd test1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm start
   ```

   or

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3001`

### Building for Production

```bash
npm run build
```

## Project Structure

```
test1/
├── src/
│   ├── store/
│   │   ├── store.ts          # Redux store configuration
│   │   └── chartSlice.ts     # Chart data slice
│   ├── App.tsx               # Main application component
│   ├── App.css               # Application styles
│   └── index.tsx             # Application entry point
├── public/
│   └── index.html            # HTML template
├── package.json
├── tsconfig.json
└── webpack.config.js
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run dev` - Same as start but opens browser automatically
- `npm run build` - Builds the app for production

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- Recharts (Chart Library)
- Lucide React (Icons)
- Webpack 5

## Interface Overview

The dashboard replicates Power BI's interface with:

1. **Top Navigation**: Data, Model, Report tabs
2. **Left Sidebar**: Chart types and visualization options
3. **Center Canvas**: Main chart display area
4. **Right Panel**: Comprehensive chart configuration with collapsible sections
5. **Field Management**: Interactive field assignments and configurations

## Configuration Sections

The right panel includes these collapsible configuration sections:

- **Legend**: Position and visibility controls
- **Title**: Text and formatting options
- **X-axis**: Labels, rotation, and formatting
- **Y-axis**: Scale and display options
- **Values**: Number formatting and precision
- **Data Labels**: Position and styling
- **Layout**: Responsive and sizing options
- **Plot Area**: Background and styling
- **Gridlines**: Show/hide and styling
