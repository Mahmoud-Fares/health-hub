import authService from './api/auth-service';

export { useSendEmailVerification } from './api/auth-hooks';
export { useAuth } from './hooks/use-auth';
export { isDoctor, isPatient } from './utils';
export { authService };

export { AllowedTo } from './components/view-controllers/allowed-to';
export { SignedIn } from './components/view-controllers/signed-in';
export { SignedOut } from './components/view-controllers/signed-out';
export { ViewToCurrentUser } from './components/view-controllers/view-to-current-user';
export { ViewToOthersOnly } from './components/view-controllers/view-to-others-only';
