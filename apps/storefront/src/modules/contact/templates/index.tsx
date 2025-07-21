"use client"

import Input from "@modules/common/components/input"

export const ContactTemplate = () => {
  return (
    <div className="content-container flex text-white flex-col items-center mt-[2rem] gap-[2rem] min-h-[80vh]">
      <div className="h2">CONTACT</div>
      <div className="flex justify-between w-full gap-[5rem]">
        <div className="flex flex-col w-full h-full gap-5">
          <div className="h3 mb-5">SEND A MESSAGE</div>
          <Input label="Full name" name="name" topLabel="full name" />
          <Input
            label="Email"
            name="Email"
            type="email"
            required
            topLabel="Email"
          />

          <div className="h-full w-full flex flex-col">
            <label htmlFor="textarea" className="body mb-3">
              Subject
            </label>
            <textarea
              id="textarea"
              className="h-[9rem] border rounded-[20px] bg-transparent p-3"
            />
          </div>
          <button className="w-[240px] h-[60px] bg-white rounded-full">
            <div className="text-transparent bg-gradient-to-r from-[#9C52F2] to-[#4C52FB] bg-clip-text menu-body uppercase">
              Send the Message
            </div>
          </button>
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className="h3 mb-5">MORE INFORMATIONS</div>
          <div className="border rounded-[20px] bg-[#020710] h-full flex flex-col items-center justify-center gap-[1rem]">
            <div className="flex flex-col gap-3">
              <span className="body">
                Sediu: str. Victoriei, nr. 17, oras Timișoara, județul Timișoara
              </span>
              <span className="body">
                Adresă de email : abcd@gmail.logovps.ro
              </span>
              <span className="body">Număr de telefon : 12345678</span>
            </div>
            <div className="bg-[#EAEAEA] h-[2px] w-[90%] opacity-[0.6]" />
            <div className="flex-col flex gap-3">
              <span className="h3">WORK SCHEDULE</span>
              <span className="body">Luni - Vineri : 9:00-17:00</span>
              <span className="body">Sâmbătă - Duminică : Liber</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
