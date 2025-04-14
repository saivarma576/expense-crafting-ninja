
import React from 'react';
import { User, Mail } from 'lucide-react';

interface UserProfileProps {
  userName: string;
  userEmail: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userName,
  userEmail
}) => {
  return (
    <div className="flex items-center">
      <div className="h-9 w-9 bg-amber-100 rounded-full flex items-center justify-center text-xs font-medium">
        {userName.split(' ').map(name => name[0]).join('')}
      </div>
      <div className="ml-2">
        <div className="flex items-center text-sm font-medium">
          <User className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
          {userName}
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <Mail className="h-3 w-3 mr-1.5 text-gray-400" />
          {userEmail}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
