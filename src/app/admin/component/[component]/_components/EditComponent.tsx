const EditComponent = ({ component }: { component: string }) => {
    return (
        <div className='mt-28 text-secondary w-full flex flex-col items-center gap-6 max-w-[1400px]'>
            <div>component: {component}</div>
        </div>
    );
};

export default EditComponent;
