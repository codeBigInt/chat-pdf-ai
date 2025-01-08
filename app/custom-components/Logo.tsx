import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Logo: React.FC = () => {
    return (
        <Link href="/" className="flex items-center space-x-2">
          <MessageSquare className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">PDFChat</span>
        </Link>
    );
};

export default Logo;