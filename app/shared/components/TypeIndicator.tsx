import { FC } from "react";
import { motion } from "framer-motion";

const colorForEnergyType = (type: string) => {
    switch (type) {
        case 'Grass':
            return 'bg-green-500';
        case 'Fire':
            return 'bg-red-600';
        case 'Water':
            return 'bg-blue-500';
        case 'Lightning':
            return 'bg-yellow-300';
        case 'Psychic':
            return 'bg-purple-400';
        case 'Fighting':
            return 'bg-yellow-700';
        case 'Darkness':
            return 'bg-gray-700';
        case 'Metal':
            return 'bg-gray-400';
        case 'Fairy':
            return 'bg-pink-500';
        case 'Colorless':
        default:
            return 'bg-gray-200';
    }
}

const TypeIndicator: FC<{ type: string }> = ({ type }) => {
    const indicatorColor = colorForEnergyType(type);

    return <div className="flex flex-row items-center relative" title={type} >
        <div>
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
        </div>
        <div>
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
        </div>
        <div>
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
        </div>
        <div>
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
            <motion.div className={`h-1 w-1 ${indicatorColor}`} />
        </div>
    </div>
}

export default TypeIndicator;