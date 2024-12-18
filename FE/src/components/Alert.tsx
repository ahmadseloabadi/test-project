import React from "react";

interface AlertProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Alert({ onConfirm, onCancel }: AlertProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-[4px] w-96">
        <div className="flex flex-col w-full items-center gap-6">
          <img
            src="../src/assets/img-BeepBeep.png"
            className=" h-[121px] w-[153px]"
          />
          <p className="text-lg font-semibold mb-4">Menghapus Data Mobil</p>
        </div>
        <div className="alertbody text-center mb-6">
          <p>
            Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin ingin
            menghapus?
          </p>
        </div>

        <div className="flex justify-center">
          <button
            className="mr-4 px-3 py-2 bg-blue-900 text-white  hover:bg-white  hover:text-blue-900 border border-blue-800 rounded-[2px] w-[87px] font-bold text-[14px]"
            onClick={onConfirm}
          >
            Ya
          </button>
          <button
            className="bg-transparent hover:bg-blue-900 text-blue-900  hover:text-white py-2 px-4 border border-blue-800 hover:border-transparent rounded-[2px] w-[87px] font-bold text-[14px]"
            onClick={onCancel}
          >
            Tidak
          </button>
        </div>
      </div>
    </div>
  );
}
