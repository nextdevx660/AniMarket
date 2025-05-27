import React from 'react'
import {
          Dialog,
          DialogContent,
          DialogDescription,
          DialogHeader,
          DialogTitle,
          DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'


export default function DeleteConfirmationDialogue({ children, deleteProduct }) {
          return (
                    <div>
                              <Dialog>
                                        <DialogTrigger>
                                                  {children}
                                        </DialogTrigger>
                                        <DialogContent>
                                                  <DialogHeader>
                                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                            <DialogDescription>
                                                                      <h2>
                                                                                You want to Delete the product. This action cannot be undone. This will permanently delete the product and remove it from your account.
                                                                      </h2>

                                                                      <div className='flex items-center justify-end gap-3 mt-5'>
                                                                                <Button className="bg-red-500 hover:bg-red-400" onClick={deleteProduct}>Delete</Button>
                                                                                <Button>Cancel</Button>
                                                                      </div>
                                                            </DialogDescription>
                                                  </DialogHeader>
                                        </DialogContent>
                              </Dialog>

                    </div>
          )
}
