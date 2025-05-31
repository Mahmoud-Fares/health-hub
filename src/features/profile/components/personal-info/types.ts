import { AuthUser, Doctor, Patient } from '@/shared/types';

export type InfoItemProps = {
   icon: React.ReactNode;
   title: string;
   value: string | number | undefined;
   unit?: string;
   highlight?: boolean;
};

export type PersonalInfoSectionProps = {
   user: AuthUser;
};

export type DoctorInfoSectionProps = {
   user: Doctor;
};

export type PatientInfoSectionProps = {
   user: Patient;
};

export type PersonalInfoProps = {
   user: AuthUser;
};
