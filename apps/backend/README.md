## Getting Started

### 1. Clone the repository

Start by cloning the AmbientAI repository to your local machine:

```bash
git clone https://github.com/RGomes98/AmbientAI.git
cd AmbientAI
```

This will download the project and move you into its root directory.

### Configure environment variables

AmbientAI uses several environment variables to configure the backend server. These should be defined in a `.env.local` file located in the `apps/backend` directory.

1. Navigate to the `apps/backend` folder:

```bash
cd apps/backend
```

2. Copy the example environment file to create your local configuration:

**Linux/macOS:**

```bash
cp .env.example .env.local
```

**Windows (Command Prompt):**

```cmd
copy .env.example .env.local
```

3. Open `.env.local` and modify the values as needed.

### Install dependencies

Once you've configured your environment variables, follow these steps to install the necessary dependencies:

1. Navigate back to the root folder of the project (`AmbientAI`):

   ```bash
   cd ../../
   ```

2. Install all project dependencies:

   ```bash
   npm install
   ```

This will install the required packages across the entire project, including the backend.

### Launch the Development Server

After the environment variables are set and dependencies are installed, start the server:

```bash
npm run dev
```

This will launch the backend server in development mode. By default, it will be available at:
`http://localhost:8080`
