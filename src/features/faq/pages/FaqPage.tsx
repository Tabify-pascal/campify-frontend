import PageHeader from "../../../components/layout/PageHeader/PageHeader";
import { useFaqItems } from "../queries/useFaqs";
import FaqAccordion from "../components/FaqAccordion";
import MessageCard from "../../../components/ui/MessageCard/MessageCard";

export default function FaqPage(){
    const { 
        data: faqItems = [],
        isLoading,
        error,
    } = useFaqItems();

    if(isLoading){
        return <p>Laden...</p>
    }

    if (error) {
        return <MessageCard
            title="Er ging iets mis"
            message="De veelgestelde vragen konden niet worden geladen."
            linkTo="/"
            linkText="Terug naar home"
        />
    }

    return(
        <>
        <PageHeader
            title="Veelgestelde vragen"
            description="Vind snel antwoord op de meest gestelde vragen over reserveren en kamperen."
        />
        <FaqAccordion items={faqItems} />
        </>
    );
}
