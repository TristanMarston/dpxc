import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown, ChevronRight, Clipboard, Copy, Hash, Pencil, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import EditDocument from './EditDocument';
import axios from 'axios';
import { fetchCollectionData, useCollectionContext } from '../../context';
import CreateDocument from './CreateDocument';

const FormattedView = ({ collection }: { collection: string }) => {
    const context = useCollectionContext();
    if (context === undefined) throw new Error('useContext(CollectionContext) must be used within a CollectionContext.Provider');
    const { collectionData, setCollectionData, fetchState, setFetchState, schema, setSchema, selectedView, setSelectedView } = context;

    const [currentData, setCurrentData] = useState<any>({});
    const [currentID, setCurrentID] = useState('');
    const [editDialog, setEditDialog] = useState(false);
    const [duplicateDialog, setDuplicateDialog] = useState(false);
    const [deleteSection, setDeleteSection] = useState(false);
    const [query, setQuery] = useState('');
    const [filteredData, setFilteredData] = useState<any[]>(collectionData);

    useEffect(() => {
        if (schema.filter((key) => key.key === 'firstName' || key.key === 'lastName').length === 2) {
            if (query.trim() === '') {
                setFilteredData(collectionData);
            } else {
                setFilteredData(collectionData.filter((athlete) => `${athlete.firstName} ${athlete.lastName}`.toLowerCase().includes(query.toLowerCase())));
            }
        }
    }, [query, collectionData]);

    const refreshDocuments = async () => {
        const result = await fetchCollectionData(collection);

        if (result.status === 200 && result.data) {
            setCollectionData(result.data.data);
            setSchema([...result.data.schema]);
            setFetchState('success');
        } else setFetchState('failed');
    };

    const copyToClipboard = (text: string) => {
        const toastID = toast.loading('Copying to clipboard...', { className: '!bg-secondary-light !text-black', position: 'bottom-right' });

        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast.success('Copied to clipboard!', {
                    id: toastID,
                    duration: 4000,
                });
            })
            .catch((err) => {
                toast.error('Failed to copy.', {
                    id: toastID,
                    duration: 4000,
                });
            });
    };

    const deleteDocument = (id: string) => {
        const toastID = toast.loading('Deleting document...', { className: '!bg-secondary-light !text-black', position: 'top-center' });

        axios
            .delete(`/api/admin/delete/${collection}/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Successfully deleted!', {
                        id: toastID,
                        duration: 4000,
                    });
                    refreshDocuments();
                }
            })
            .catch((err) => {
                toast.error('Could not delete. Please try again.', {
                    id: toastID,
                    duration: 4000,
                });
            });
    };

    return (
        <div className='flex flex-col gap-3 w-full mt-3'>
            {(collection === 'goodland-youth-participants' || collection === 'goodland-community-participants') && (
                <span className={`flex relative`}>
                    <input
                        placeholder={'Name'}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={`placeholder:text-secondary placeholder:opacity-80 mb-2 outline-none w-full bg-background-light text-secondary pl-10 pr-2 py-2 rounded-full shadow-[0_4px_30px_rgba(0,0,0,.4)]`}
                    />
                    <Search className='absolute left-3 top-3 opacity-80 w-5 h-5' />
                </span>
            )}
            {filteredData.map((obj, index) => (
                <div key={index}>
                    <div
                        key={obj._id + index}
                        className={`w-full bg-background-light shadow-[0_4px_30px_rgba(0,0,0,.4)] relative h-fit p-4 group ${deleteSection ? 'rounded-t-2xl' : 'rounded-2xl'}`}
                    >
                        {obj._id && (
                            <div>
                                <span className='font-bold'>_id: </span>
                                <span className='text-red-400'>{obj._id}</span>
                            </div>
                        )}
                        {schema.map(({ key, type, required }: { key: string; type: string; required: boolean }, index: number) =>
                            (required || key === 'bibNumber' || obj[key] || obj[key] === 'false') && typeof type !== 'object' ? (
                                // <div key={key + index}>
                                //     <span className='font-bold'>{key}</span>:{' '}
                                //     <span
                                //         className={`${
                                //             type === 'string' ? 'text-green-400' : type === 'number' ? 'text-blue-600' : type === 'boolean' ? 'text-purple-400' : 'text-secondary'
                                //         }`}
                                //     >
                                //         {type === 'string' ? '"' : ''}
                                //         {obj[key].toString()}
                                //         {type === 'string' ? '"' : ''}
                                //     </span>
                                // </div>
                                <RegularObject key={key + index} objKey={key} type={type} obj={obj} />
                            ) : required || obj[key] ? (
                                <NestedObject key={key + index} objKey={key} type={type} obj={obj} object={undefined} />
                            ) : (
                                <></>
                            )
                        )}
                        {obj.createdAt && (
                            <div>
                                <span className='font-bold'>createdAt: </span>
                                <span className='text-blue-400'>
                                    {new Date(obj.createdAt).toLocaleString('en-US', {
                                        year: '2-digit',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: true,
                                    })}
                                </span>
                            </div>
                        )}
                        {obj.updatedAt && (
                            <div>
                                <span className='font-bold'>updatedAt: </span>
                                <span className='text-blue-400'>
                                    {new Date(obj.updatedAt).toLocaleString('en-US', {
                                        year: '2-digit',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: true,
                                    })}
                                </span>
                            </div>
                        )}
                        <div className='flex gap-3 absolute right-0 top-0 pt-4 pr-4'>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger
                                        onClick={() => {
                                            setEditDialog(true);
                                            setCurrentData(obj);
                                            setCurrentID(obj._id);
                                        }}
                                    >
                                        <span className='grid place-items-center p-2 bg-background shadow-[0_4px_30px_rgba(0,0,0,.4)] rounded-lg scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all cursor-pointer hover:bg-background-light'>
                                            <Pencil />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className='bg-background text-secondary outline-none border-none'>Edit</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger
                                        onClick={() => {
                                            setDuplicateDialog(true);
                                            setCurrentData(obj);
                                        }}
                                    >
                                        <span className='grid place-items-center p-2 bg-background shadow-[0_4px_30px_rgba(0,0,0,.4)] rounded-lg scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all cursor-pointer hover:bg-background-light'>
                                            <Copy />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className='bg-background text-secondary outline-none border-none'>Duplicate</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger onClick={() => copyToClipboard(JSON.stringify(obj))}>
                                        <span className='grid place-items-center p-2 bg-background shadow-[0_4px_30px_rgba(0,0,0,.4)] rounded-lg scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all cursor-pointer hover:bg-background-light'>
                                            <Clipboard />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className='bg-background text-secondary outline-none border-none'>Copy</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger
                                        onClick={() => {
                                            setDeleteSection((prev) => !prev);
                                            setCurrentID(obj._id);
                                        }}
                                    >
                                        <span className='grid place-items-center p-2 bg-background shadow-[0_4px_30px_rgba(0,0,0,.4)] rounded-lg scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all cursor-pointer hover:bg-background-light'>
                                            <Trash2 />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent className='bg-background text-secondary outline-none border-none'>Delete</TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                    <div
                        className={`${
                            deleteSection && currentID === obj._id ? 'flex' : 'hidden'
                        } justify-between items-center rounded-b-2xl w-full h-full py-2 px-3 bg-background-lighter shadow-[0_4px_30px_rgba(0,0,0,.4)] clip-path-none`}
                    >
                        <h4 className='font-bold'>Delete document?</h4>
                        <div className='flex gap-2'>
                            <button
                                className='bg-background-lighter text-secondary rounded-lg grid place-items-center py-1 px-3 hover:bg-background-lightest transition-colors'
                                onClick={() => setDeleteSection(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className='bg-secondary text-background-lightest font-bold rounded-lg grid place-items-center py-1 px-3 hover:bg-secondary-hover transition-colors'
                                onClick={() => {
                                    deleteDocument(obj._id);
                                    setDeleteSection(false);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <Dialog open={editDialog && !duplicateDialog} onOpenChange={setEditDialog}>
                <DialogContent className='bg-secondary rounded-md gap-2.5 text-background border-0 w-[95vw] mobile:w-[90vw] tablet:w-[512px]'>
                    <EditDocument data={currentData} id={currentID} collection={collection} />
                </DialogContent>
            </Dialog>
            <Dialog open={duplicateDialog && !editDialog} onOpenChange={setDuplicateDialog}>
                <DialogContent className='bg-secondary rounded-md gap-2.5 text-background border-0 w-[95vw] mobile:w-[90vw] tablet:w-[512px]'>
                    <CreateDocument data={currentData} duplicate={true} collection={collection} />
                </DialogContent>
            </Dialog>
        </div>
    );
};

const RegularObject = ({ objKey, type, obj }: { objKey: string; type: string; obj: any }) => {
    return (
        <div>
            <span className='font-bold'>{objKey}</span>:{' '}
            <span className={`${type === 'string' ? 'text-green-400' : type === 'number' ? 'text-purple-400' : type === 'boolean' ? 'text-blue-600' : 'text-secondary'}`}>
                {type === 'string' ? '"' : ''}
                {obj[objKey].toString()}
                {type === 'string' ? '"' : ''}
            </span>
        </div>
    );
};

const NestedObject = ({ objKey, type, obj, object }: { objKey: string; type: any; obj: any; object: any | undefined | null }) => {
    const [opened, setOpened] = useState(false);
    object = object !== undefined && object !== null ? object : obj[objKey];
    const isArray = Array.isArray(object);
    const isEmpty = isArray ? object.length === 0 : Object.keys(object).length === 0;

    return (
        <div className='flex gap-2'>
            <span onClick={() => setOpened((prev) => !prev)}>
                <ChevronRight className={`${opened ? 'rotate-90' : 'rotate-0'} text-secondary transition-all`} />
            </span>
            <div>
                <span className='font-bold'>{objKey}</span>
                {objKey.length > 0 ? ':' : ''} <span>{isArray ? (opened ? '[' : `[${!isEmpty ? '...' : ' '}]`) : opened ? '{' : `{${!isEmpty ? '...' : ' '}}`}</span>
                <div className={!isArray ? 'pl-6' : ''}>
                    {opened &&
                        !isEmpty &&
                        (isArray
                            ? object.map((obj: any) => <NestedObject key={obj} objKey='' type={type} obj={obj} object={obj} />)
                            : Object.keys(type).map((key, index) =>
                                  type[key].type !== 'object' && typeof type[key].type !== 'object' ? (
                                      <RegularObject key={key + index} objKey={key} type={type[key].type} obj={obj} />
                                  ) : (
                                      <NestedObject key={key + index} objKey={key} type={type[key].type} obj={obj} object={undefined} />
                                  )
                              ))}
                </div>
                {opened && isEmpty && <br></br>}
                <span>{opened ? (isArray ? ']' : '}') : ''}</span>
            </div>
        </div>
    );
};

export default FormattedView;
