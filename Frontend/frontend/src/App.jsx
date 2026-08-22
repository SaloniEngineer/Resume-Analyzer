import { RouterProvider } from "react-router-dom"; // 
import router from "./app.routes";
import {AuthProvider} from "./features/auth/auth.context";
import {InterviewProvider} from "./.features/interview/pages/interview.context.jsx"

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <InterviewProvider>
        
      </InterviewProvider>
    </AuthProvider>
  );
}

export default App;