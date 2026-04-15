import { UseMutationResult } from "@tanstack/react-query";
import SnippetForm from "./SnippetForm";
import { ISnippet, UpdateSnippetDto } from "../services/types/snippet";



interface ModalProps {
  updateMutation: UseMutationResult<ISnippet, Error, UpdateSnippetDto, unknown>;
  selectedSnippet: ISnippet | undefined;
  closeModal: () => void;
  isModalOpen: boolean;
}   

const Modal = ({updateMutation, selectedSnippet, closeModal, isModalOpen}: ModalProps) => {
  return (
    <div>   
        {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            
            <h2 className="text-xl font-bold mb-4">Редагувати сніпет</h2>

            <SnippetForm 
              initialData={selectedSnippet}
              onSubmit={updateMutation.mutate}
              isLoading={updateMutation.isPending}
            />
          </div>
        </div>
      )}
    </div>

)};

export default Modal;