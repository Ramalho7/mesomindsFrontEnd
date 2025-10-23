import math from '@/assets/images/2423222.jpg';

export default function StoryFooter() {
    return (
        <>
            <div className="flex flex-col min-h-[31.25rem]">
                <footer className="sm:flex sm:flex-col sm:justify-between border-solid border-t-2 border-action p-5 flex-grow">
                    <div className="sm:flex sm:gap-[6.25rem] md:gap-[2.5rem]">
                        <div>
                            <h2 className="font-black text-action text-5xl">Mesominds</h2>
                            <p className='text-black text-xl'>Plataforma dedicada ao ensino de matemática grátis!</p>
                        </div>
                        <div className='flex flex-row gap-2 mt-7 sm:mt-0 sm:gap-0 sm:max-h-[31.25rem] md:max-h-[11.25rem] md:gap-4'>
                            <div className='flex flex-col gap-[1rem] w-[50%]'>
                                <h2 className='text-secondary font-black text-3xl'>Links úteis</h2>
                                <span className='text-2xl cursor-pointer'>Contato</span>
                                <span className='text-2xl cursor-pointer'>Recursos</span>
                                <span className='text-2xl cursor-pointer'>Abordagem</span>
                                <span className='text-2xl cursor-pointer'>Sobre</span>
                                <span className='text-2xl cursor-pointer'>Como funciona</span>
                            </div>
                            <img src={math} className='w-[50%] sm:w-full'/>
                        </div>
                    </div>
                </footer>
                <div className="mt-auto text-center text-sm text-gray-500 p-5 border-t border-gray-300">
                    © {new Date().getFullYear()} Mesominds. Todos os direitos reservados.
                </div>
            </div>
        </>
    )
}