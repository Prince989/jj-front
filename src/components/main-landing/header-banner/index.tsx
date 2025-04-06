import React from 'react';
import { Typography, Button } from '@mui/material';
import { Phone } from '@mui/icons-material';

const HeaderBanner: React.FC = () => {
    return (
        <div className="hidden w-full h-12 bg-blue-800 lg:flex justify-between items-center px-[120px] text-white">
            <div className="flex items-center gap-6">
                <Button
                    href="/support"
                    variant="text"
                    className="text-white hover:text-gray-200 text-sm font-medium p-0 min-w-0 border-l border-white"
                >
                    همراه اعتباری
                </Button>
                <Button
                    href="/account"
                    variant="text"
                    className="text-white hover:text-gray-200 text-sm font-medium p-0 min-w-0"
                >
                    جی جی لند
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <Phone fontSize="small" />
                <Typography variant="body2" className="text-white font-medium ltr">
                    ۰۲۱-۴۳۶۵۶۵۲۳
                </Typography>
            </div>
        </div>
    );
};

export default HeaderBanner;
