import { motion } from 'framer-motion';

const Path = ({ color, ...props }: { color: string; [key: string]: any }) => <motion.path fill='transparent' strokeWidth='3' stroke={color} strokeLinecap='round' {...props} />;

const MenuToggle = ({ toggle, isOpen, color }: { toggle: () => void; isOpen: boolean; color: string }) => (
    <button
        onClick={toggle}
        className={`${isOpen ? 'bg-secondary shadow-[0_4px_30px_rgba(0,0,0,.7)]' : 'bg-transparent shadow-none'} z-50 p-3 rounded-full grid place-items-center transition-colors`}
    >
        <svg width='21' height='21' viewBox='0 0 21 20'>
            <Path
                color={color}
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                }}
                initial={{ d: 'M 2 2.5 L 20 2.5' }}
            />
            <Path
                color={color}
                transition={{ duration: 0.1 }}
                d='M 2 9.423 L 20 9.423'
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
            />
            <Path
                color={color}
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                }}
                initial={{ d: 'M 2 16.346 L 20 16.346' }}
            />
        </svg>
    </button>
);

export default MenuToggle;
