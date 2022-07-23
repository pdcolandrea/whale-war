import { trpc } from "../../utils/trpc";

function FindBattle() {
    const findBattle = trpc.proxy.example.postBattle.useMutation();

    const onFindPress = () => {
        let data;
        findBattle.mutate(data, {
            onSuccess: () => {

            }
        })
    };

    return (
        <div className="flex flex-col items-center mx-auto">
            <h1 className="text-4xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
                Find Games
            </h1>
            <button onClick={onFindPress} className=" bg-slate-400 p-2 shadow-sm mt-5 w-1/3">
                Find
            </button>
        </div>
    );
}

export default FindBattle;
