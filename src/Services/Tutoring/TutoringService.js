import BroadCastEngine from "../Engines/ApIConfigurationBroadCast";

const TutoringService = {
    PostQuestionnaire: ({ OrderDetailsId, Topic, TeachingMethods, Dominance }) =>
        BroadCastEngine.Post('/Tutoring/TutoringForm', {
            OrderDetailsId,
            Topic,
            TeachingMethods,
            Dominance,
        }),
}

export default TutoringService;