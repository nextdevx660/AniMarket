import React from 'react'
import {
          Popover,
          PopoverContent,
          PopoverTrigger,
} from "@/components/ui/popover"
import { ChartLine, PenBoxIcon, Trash2Icon } from 'lucide-react'
import DeleteConfirmationDialogue from './DeleteConfirmationDialogue'
import axios from 'axios'


export default function ProductEditableOption({ children, product }) {
          const deleteProduct = async () => {
                    try {
                              console.log("Product ID to delete:", product?.id);
                              const result = await axios.delete(`/api/products?productId=${product?.id}`);
                              console.log(result.data);
                              window.location.reload();
                    } catch (err) {
                              console.error("Delete error:", err.response?.data || err.message);
                    }
          };

          return (
                    <Popover>
                              <PopoverTrigger>
                                        {children}
                              </PopoverTrigger>
                              <PopoverContent>
                                        <ul>
                                                  <li className='text-gray-600 flex items-center justify-start gap-2 cursor-pointer hover:bg-slate-100 p-2 rounded-md'><PenBoxIcon className='w-5' /> Edit</li>
                                                  <li className='text-gray-600 flex items-center justify-start gap-2 cursor-pointer hover:bg-slate-100 p-2 rounded-md'><ChartLine className='w-5' /> Analytics</li>
                                                  <DeleteConfirmationDialogue deleteProduct={deleteProduct}>
                                                            <li className='text-red-600 flex items-center justify-start gap-2 cursor-pointer hover:bg-slate-100 p-2 rounded-md'><Trash2Icon className='w-5' /> Delete</li>

                                                  </DeleteConfirmationDialogue>
                                        </ul>
                              </PopoverContent>
                    </Popover>

          )
}

