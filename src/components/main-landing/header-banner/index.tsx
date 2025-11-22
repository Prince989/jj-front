import React from 'react';
import { Typography, Button } from '@mui/material';
import { Phone } from '@mui/icons-material';

const HeaderBanner: React.FC = () => {
    return (
        <div className="hidden w-full h-10 bg-blue-800 lg:flex justify-between items-center px-3 lg:px-24 text-white">
            <div className="flex items-center gap-2">
                <Button
                    href="/account"
                    variant="text"
                    className="text-white hover:text-gray-200 text-xs font-medium p-0 min-w-0"
                >
                    جی جی لند
                </Button>

                <div className="bg-white h-[20px] w-[1px]"></div>
                <Button
                    href="/support"
                    variant="text"
                    className="text-white hover:text-gray-200 text-xs font-medium p-0 min-w-0 border-l border-white"
                >
                    همواره اعتبار
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <Typography variant="body2" className="text-white text-xs font-medium">
                    ۰۲۱-۴۳۶۵۶۵۲۳
                </Typography>
                <Phone fontSize="small" sx={{ fontSize: '15px' }} />
            </div>
        </div>
    );
};

export default HeaderBanner;
