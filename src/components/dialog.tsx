import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { instance } from '../services/api_instance';

type ModalProps = {
    open:boolean;
    closeCallback:any;
    nameTextCallback:any;
    descriptionTextCallback:any;
    title:string;
    id:string;
    oldName:string;
    oldDescription:string;
}

 const CustomModal: React.FC<ModalProps> = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [name,setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
 
  const close=()=>{
    props.closeCallback();
    setButtonIsDisabled(false);
  }

  return (
    <>
      
      <Transition appear show={props.open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={()=>{
              close();
        }}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-primary-500 pl-2 py-2 font-bold text-shadow"
                >
                  <p>{props.title}</p>
                </Dialog.Title>
                <div className="mt-2">
                    <h1 className='text-primary-700 text-md mb-5 ml-3 text-shadow'>Hobby Name</h1>
                  <input defaultValue={props.oldName} className="bg-purple-white shadow-md rounded-xl border-0 py-3 pl-5 pr-5 w-full outline-none" placeholder="Enter the new name ..."  onChange={event => setName( event.target.value )} />
                 
                  <h1 className='text-primary-700 text-md my-5 ml-3 text-shadow'>Hobby Description</h1>

                  <input defaultValue={props.oldDescription} className="bg-purple-white shadow-md rounded-xl border-0 py-3 pl-5 pr-5 w-full outline-none" placeholder="Enter Discription ..."  onChange={event => setDescription( event.target.value )} />

                  <h1 className='text-primary-700 text-md my-5 ml-3 text-shadow'>Hobby Image</h1>

                  <input className="bg-purple-white shadow-md rounded-xl border-0 py-3 pl-5 pr-5 w-full outline-none" placeholder="Enter Discription ..."  onChange={event => setImage( event.target.value )} />
                </div>

                <div className="mt-4 flex justify-end ">
                  <button
                    type="button"
                    className="flex justify-self-end  align-end px-4 py-2 text-sm font-medium text-primary-600 bg-primary-100 border border-transparent rounded-md hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 mr-2 w-20 justify-center"
                    onClick={()=>{
                        close();
                    
                    }
                
                }
                  >
                      <p className='text-center flex justify-self-center'> Cancel </p>
                  </button>

                  <button
                    type="button"
                    className="flex justify-self-end  align-end px-4 py-2 text-sm font-medium text-primary-600 bg-primary-100 border border-transparent rounded-md hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 w-20 justify-center"
                    onClick={
                        ()=>{
                       if(buttonIsDisabled === false){
                        if(props.title === "Edit"){
                          setButtonIsDisabled(true);
                            instance.put('/admin/hobby', {
                                id:props.id,
                                name: name.toLowerCase(),
                                description: description,
                                image: null
                            }).then((response) => {
                                console.log(response.data);
                                close();
                                
                            }).catch((error) => {
                                console.log(error);
                            })
                            
                            }
                            if (props.title === "Add") {
                              setButtonIsDisabled(true);
                                instance.post('/admin/hobby', {
                                    name: name.toLowerCase(),
                                    description: description,
                                    image: image.trim()
                                }).then((response) => {
                                    console.log(response.data);
                                    close();
                                }).catch((error) => {
                                    console.log(error);
                                })
                               
                            }
                       }
                           

                        }
                    }
                  >
                    <p className='text-center flex justify-self-center'> {props.title} </p>
                  </button>

                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CustomModal;
