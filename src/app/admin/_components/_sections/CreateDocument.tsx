import { DialogClose, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchCollectionData, useCollectionContext } from '../../context';
import FitText from '@/_components/FitText';
import { ChevronRight, CirclePlus } from 'lucide-react';

const CreateDocument = ({ collection, duplicate, data }: { collection: string; duplicate: boolean; data: any }) => {
    const context = useCollectionContext();
    if (context === undefined) throw new Error('useContext(CollectionContext) must be used within a CollectionContext.Provider');
    const { collectionData, setCollectionData, fetchState, setFetchState, schema, setSchema, selectedView, setSelectedView } = context;
    const [documentData, setDocumentData] = useState<any>(() => {
        const res: any = {};
        if (duplicate) {
            schema.forEach(({ key }) => {
                res[key] = data[key];
            });
        } else {
            schema.forEach(({ key, type, required }) => {
                console.log(key, type);
                res[key] = type === 'string' ? '' : type === 'boolean' ? false : type === 'number' ? 0 : type === 'object' || typeof type === 'object' ? [] : '';
            });
        }
        return res;
    });

    useEffect(() => console.log(documentData), [documentData]);

    const refreshDocuments = async () => {
        const result = await fetchCollectionData(collection);

        if (result.status === 200 && result.data) {
            setCollectionData(result.data.data);
            setSchema([...result.data.schema]);
            setFetchState('success');
        } else setFetchState('failed');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | { target: { name: string; value: any } }, nestString = '') => {
        const { name, value } = e.target;
        if (nestString === '') {
            setDocumentData({
                ...documentData,
                [name]: value,
            });
        } else {
            const keys = nestString.split('/');
            console.log(keys);
            setDocumentData((prev: any) => {
                let newState: any = { ...prev };
                let nestedObject = newState;

                for (let i = 0; i < keys.length - 1; i++) {
                    const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
                    nestedObject = nestedObject[key];
                }

                const finalKey = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
                nestedObject[finalKey] = value;
                console.log(newState);
                return newState;
            });
        }
    };

    const submitChanges = () => {
        const submitData: any = {};
        schema.forEach(({ key, type, required }) => {
            if (documentData[key] !== undefined && documentData[key] !== null && documentData[key].toString().length > 0) {
                let typeMatch =
                    (type === 'boolean' && (typeof documentData[key] === 'boolean' || documentData[key] === 'true' || documentData[key] === 'false')) ||
                    (type === 'number' && !isNaN(parseInt(documentData[key]))) ||
                    ((type === 'object' || typeof type === 'object') && typeof documentData[key] === 'object') ||
                    type === 'string';
                if (typeMatch) submitData[key] = documentData[key];
            }
        });

        if (submitData.length === 0) return;

        const toastID = toast.loading('Creating document...', {
            className: '!bg-secondary-light !text-black',
            position: 'top-center',
        });

        axios
            .post(`/api/admin/post/${collection}`, JSON.stringify(submitData))
            .then((res) => {
                console.log(res);
                if (res.status === 201) {
                    toast.success('Successfully created!', {
                        id: toastID,
                        duration: 4000,
                    });
                    refreshDocuments();
                }
            })
            .catch((err) => {
                toast.error('Could not create. Please try again.', {
                    id: toastID,
                    duration: 4000,
                });
            });
    };

    return (
        <div>
            <DialogTitle className='text-[1.35rem] phone:text-2xl text-background'>{duplicate ? 'Duplicate' : 'Create'} Document</DialogTitle>
            <div className='w-full flex flex-col gap-2 mt-2'>
                {schema.map(({ key, type, required }: { key: string; type: string; required: boolean }, index: number) => {
                    return (
                        <div className='flex' key={key + type + 'modal'}>
                            <label htmlFor={key} className='text-right text-nowrap items-center justify-end pr-3 inline-flex'>
                                <FitText text={key} className='h-9 flex items-center justify-end w-[100px] tablet:w-[112px]' align={'right'} />
                            </label>
                            {type !== 'object' && typeof type !== 'object' ? (
                                <RegularObject
                                    objKey={key}
                                    type={type}
                                    required={required}
                                    documentData={documentData}
                                    setDocumentData={setDocumentData}
                                    handleChange={(e) => handleChange(e, key)}
                                    nestString={key}
                                />
                            ) : (
                                <NestedObject
                                    objKey={key}
                                    type={type}
                                    required={required}
                                    documentData={documentData}
                                    setDocumentData={setDocumentData}
                                    handleChange={handleChange}
                                    nestString={key}
                                />
                            )}
                        </div>
                    );
                })}
                <section className='w-full flex gap-2 mt-3'>
                    <DialogClose className='grid place-items-center w-full py-2 shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.1)] rounded-full bg-secondary hover:shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.2)] transition-shadow'>
                        Close
                    </DialogClose>
                    <DialogClose
                        className='grid place-items-center w-full py-2 shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.2)] rounded-full bg-background hover:bg-background-lighter text-secondary transition-colors'
                        onClick={() => submitChanges()}
                    >
                        Submit
                    </DialogClose>
                </section>
            </div>
        </div>
    );
};

const NestedObject = ({
    objKey,
    type,
    required,
    documentData,
    setDocumentData,
    handleChange,
    nestString,
}: {
    objKey: string;
    type: any;
    required: boolean;
    documentData: any;
    setDocumentData: React.Dispatch<React.SetStateAction<any>>;
    handleChange: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | {
                  target: {
                      name: string;
                      value: any;
                  };
              },
        nestString?: string
    ) => void;
    nestString: string;
}) => {
    const [opened, setOpened] = useState(false);

    const nestedValue = (nestString: string) => {
        let obj: any = documentData;
        nestString.split('/').forEach((split) => {
            obj = obj[split];
        });
        return obj;
    };

    const key = objKey;
    const object: any = nestedValue(nestString);
    const isArray = Array.isArray(object);

    return (
        <div className='shadow-[0_3px_10px_rgb(0,0,0,0.1)] rounded-md text-sm max-h-[200px] overflow-y-scroll w-full'>
            <span className='h-9 flex items-center justify-between p-2 gap-1.5'>
                <span className='flex gap-2'>
                    <p>
                        {object ? object.length : 0} document{object ? (object.length === 1 ? '' : 's') : 's'}
                    </p>
                    <CirclePlus
                        onClick={() => {
                            setOpened(true);
                            const obj: any = {};

                            Object.keys(type).forEach(
                                (keyType) =>
                                    (obj[keyType] =
                                        type[keyType].type === 'string'
                                            ? ''
                                            : type[keyType].type === 'boolean'
                                            ? false
                                            : type[keyType].type === 'number'
                                            ? 0
                                            : typeof type[keyType].type === 'object' || type[keyType].type === 'object'
                                            ? {}
                                            : '')
                            );

                            object.push(obj);

                            handleChange({ target: { name: 'dropDownOptions', value: object } });
                        }}
                        className='scale-100 hover:scale-110 transition-all w-5 h-5 cursor-pointer'
                    />
                </span>
                <span onClick={() => setOpened((prev) => !prev)}>
                    <ChevronRight className={`${opened ? 'rotate-90' : 'rotate-0'} text-background transition-all`} />
                </span>
            </span>
            <section className={`${opened ? 'flex' : 'hidden'} flex-col gap-2`}>
                {isArray &&
                    object.map((obj: any, index: number) => (
                        <div key={index + obj} className='flex flex-col gap-2'>
                            <h4 className='ml-2 rounded-full p-1 border border-background w-6 h-6 flex justify-center items-center'>{index + 1}</h4>
                            {Object.keys(type).map((typeKey: string) => (
                                <div className='grid grid-rows-1 grid-cols-[100px_1fr] tablet:grid-cols-[112px_1fr]' key={typeKey + type + 'modal'}>
                                    <label htmlFor={typeKey} className='text-right text-nowrap items-center justify-end pr-3 inline-flex'>
                                        <FitText text={typeKey} className='h-9 flex items-center justify-end w-[100px] tablet:w-[112px]' align={'right'} />
                                    </label>
                                    {type[typeKey].type !== 'object' && typeof type[typeKey].type !== 'object' ? (
                                        <RegularObject
                                            objKey={typeKey}
                                            type={type[typeKey].type}
                                            required={required}
                                            documentData={documentData}
                                            setDocumentData={setDocumentData}
                                            handleChange={handleChange}
                                            nestString={nestString + `/${index}/` + typeKey}
                                        />
                                    ) : (
                                        <NestedObject
                                            objKey={typeKey}
                                            type={type[typeKey].type}
                                            required={required}
                                            documentData={documentData}
                                            setDocumentData={setDocumentData}
                                            handleChange={handleChange}
                                            nestString={nestString + `/${index}/` + typeKey}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
            </section>
        </div>
    );
};

const RegularObject = ({
    objKey,
    type,
    required,
    documentData,
    setDocumentData,
    handleChange,
    nestString,
}: {
    objKey: string;
    type: any;
    required: boolean;
    documentData: any;
    setDocumentData: React.Dispatch<React.SetStateAction<any>>;
    handleChange: (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | {
                  target: {
                      name: string;
                      value: any;
                  };
              },
        nestString?: string
    ) => void;
    nestString: string;
}) => {
    const key = objKey;
    const nestedValue = (nestString: string) => {
        let obj: any = documentData;
        nestString.split('/').forEach((split) => {
            console.log(obj, split);
            obj = obj[split];
        });
        return obj;
    };

    const object: any = nestedValue(nestString);

    return type === 'string' ? (
        <textarea
            value={object}
            onChange={(e) => handleChange(e, nestString)}
            autoComplete='off'
            spellCheck='false'
            autoCapitalize='off'
            name={key}
            className={`${
                object && object.length == 0 && required ? 'border-[2.5px] border-red-500 opacity-80' : 'border-0'
            } text-sm outline-0 rounded-md text-secondary text-ellipsis overflow-y-auto bg-background h-9 min-h-9 max-h-32 w-full px-2 py-2 border-gray-100 shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.1)]`}
        ></textarea>
    ) : type === 'number' ? (
        <input
            type='text'
            value={object}
            autoComplete='off'
            autoCapitalize='off'
            onChange={(e) => {
                if (!isNaN(parseInt(e.target.value))) handleChange(e, nestString);
            }}
            name={key}
            className={`${
                object && object.length == 0 && required && !isNaN(parseInt(object)) ? 'border-[2.5px] border-red-500 opacity-80' : 'border-0'
            } text-sm outline-0 rounded-md text-secondary text-ellipsis overflow-y-auto bg-background h-9 min-h-9 max-h-32 w-full px-2 py-2 border-gray-100 shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.1)]`}
        />
    ) : (
        type === 'boolean' && (
            <button
                onClick={() => {
                    handleChange({ target: { name: 'dropDownOptions', value: !documentData[key] } }, nestString);
                }}
                name={key}
                className={`${
                    object.length == 0 && required && object !== 'true' && object !== 'false' ? 'border-[2.5px] border-red-500 opacity-80' : 'border-0'
                } text-sm text-left outline-0 rounded-md text-secondary text-ellipsis overflow-y-auto bg-background h-9 min-h-9 max-h-32 w-full px-2 py-2 border-gray-100 shadow-[4.0px_4.0px_5.0px_rgba(0,0,0,0.1)]`}
            >
                {object !== undefined && object !== null ? object.toString() : 'false'}
            </button>
        )
    );
};

export default CreateDocument;
