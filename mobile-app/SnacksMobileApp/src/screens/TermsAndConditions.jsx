import React from "react";
import { View, Text, StyleSheet} from "react-native";
import * as Colors from "../utils/colors";

function TermsAndConditions (){
    return (
        <View >
        <Text style={styles.title1}>Termos e Condições</Text>
        <Text style={styles.title2}>
            Termos de Uso
        </Text>
        <Text style={styles.text}>
        {`
        A seguir estão descritas as regras aplicáveis à utilização do aplicativo Snacks, disponibilizado para dispositivos móveis com  sistema Android.
        Ao realizar o acesso ao aplicativo, o usuário se submeterá automaticamente às regas destes Termos de Uso. O usuário deve criar uma conta própria para acessar o aplicativo, sendo seu uso de caráter pessoal e intransferível. Não é permitido o compartilhamento do aplicativo em qualquer site ou ambiente virtual.
        O Snacks poderá, sem aviso prévio, bloquear e cancelar o acesso ao aplicativo quando verificar que o usuário praticou algum ato ou mantenha conduta que (i) viole as leis e regulamentos federais, estaduais e/ou municipais, (ii) contrarie as regras destes Termos de Uso, ou (iii) viole os princípios da moral, e dos bons costumes. 
        O Snacks se reserva do direito de incluir, excluir ou alterar os conteúdos e funcionalidades do aplicativo, bem como suspendê-lo temporariamente ou cancelá-lo, a qualquer momento, independentemente de aviso prévio ao usuário. Da mesma forma, poderá modificar estes Termos de Uso, cuja versão mais recente estará sempre disponível para consulta no site do aplicativo. 
        O Snacks se exime de toda e qualquer responsabilidade pelos danos e prejuízos de qualquer natureza que possam decorrer do acesso, interpretação, eliminação, alteração, modificação ou manipulação, por terceiros não autorizados, dos dados do usuário durante a utilização do aplicativo.
        As informações solicitadas ao Usuário no momento do acesso e uso do aplicativo serão utilizadas pelo Snacks somente para os fins previstos nestes Termos de Uso e em nenhuma circunstância, tais informações serão cedidas ou compartilhadas com terceiros, exceto por ordem judicial ou de autoridade competente.
        `}
        </Text>
        <Text style={styles.title1}>Política de privicidade</Text>
        <Text style={styles.text}>
        {`
        A presente Política de Privacidade descreve a forma como usamos e divulgamos os dados que coletamos de nossos clientes, quando utilizam nossos serviços. 
        Pedimos que o cliente leia o presente documento com atenção, de modo a garantir que está plenamente informado a respeito, pois este contém informações importantes sobre a utilização do aplicativo Snacks. 
        Caso remanesça alguma dúvida com relação à presente Politica de Privacidade, pedimos que entre em contato conosco pelo e-mail matheusl.2000@alunos.utfpr.edu.br. 
        `}
        </Text>
        <Text style={styles.title2}> Como coletamos os dados do cliente</Text>
        <Text style={styles.text}>
        {`
        O cliente nos fornece as respectivas informações quando: 
        (i)   Criar seu cadastro de usuário (e-mail e senha) na tela de cadastro no aplicativo;
        (ii)  Realiza login no aplicativo;
        (iii) Cria cadastros de seus filhos (nome, número da tag NFC e imagem de senha) no aplicativo;
        Todas as informações pessoas relativas a usuários e seus filhos cadastrados no sistema do aplicativo serão tratadas em concordância com a Lei Geral de Proteção de Dados, Lei n° 13.709/2018. 
        O uso dos referidos dados pelo Snacks pressupõe a aceitação desta Política de Privacidade pelo cliente. 
        O cliente será avisado acerca das respectivas informações que poderão ser coletadas pelo Insper, podendo optar pelo fornecimento ou não dessas informações, o qual também terá ciência das consequências de sua decisão, que poderá impedir a utilização das funcionalidades do aplicativo.
        A senha criada pelo cliente para cadastro junto ao aplicativo do Snacks é secreta, ficando desde já ciente de que tal credencial de acesso é de uso exclusivo, pessoal e intransferível. 
        A equipe do Snacks reserva-se ao direito de alterar este documento sem aviso prévio. Deste modo, recomendamos que o cliente consulte a nossa Política de Privacidade, a qual fica disponibilizada no site do aplicativo, de forma a estar sempre atualizado quanto aos seus termos.
        `}
        </Text>

        <Text style={styles.title2}>Como utilizamos os dados do cliente</Text>
        <Text style={styles.text}>
        {`
        Podemos usar os respectivos Dados Pessoais para: 
        (i)   Verificação de identidade: Podemos usar os Dados Pessoais para verificar a identidade do cliente conforme o cadastro realizado.
        (ii)  Processamento dos dados dos filhos: Podemos usar os dados informados no cadastro dos filhos para mostrar informações ou realizar funcionalidades específicas do aplicativo, como edição dos lanches permitidos e do limite de crédito diário disponível por parte do usuário.
        (iii) Consentimento: Podemos compartilhar as informações do cliente de outras formas caso exista consentimento expresso nesse sentido.
        `}
        </Text>
        <Text style={styles.title2}>O prazo de guarda</Text>
        <Text style={styles.text}>
        {`
        Caso o cliente deixe de utilizar o aplicativo Snacks, seus dados pessoais poderão ser mantidos para fins de auditoria e preservação de direitos, podendo ser excluídos, a pedido do cliente, conforme disposto pela Lei 12.965/2014, desde que já tenha decorrido o prazo legal prescricional relacionado às provas às quais os referidos registros e informações possam estar relacionados.
        `}
        </Text>
        <Text style={styles.title2}>A segurança dos dados</Text>
        <Text style={styles.text}>
        {`
        As informações coletadas são tratadas pelo Snacks como sigilosas, de modo que qualquer funcionário ou prestador de serviços que entre em contato com elas se comprometerá a não desvirtuar sua utilização, bem como em não as utilizar de modo destoante do quanto previsto nesta Política de Privacidade.
        O Snacks emprega todos os esforços razoáveis a fim de garantir a segurança de seus sistemas na guarda de referidos dados. Contudo, em que pese todos os esforços do Snacks, considerando-se as próprias características da Internet, este não pode garantir que terceiros mal intencionados não logrem sucesso em acessar indevidamente as informações armazenadas pelo Snacks.
        `}
        </Text>
        <Text style={styles.title2}>Data da última revisão: 24 de outubro de 2023</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    title1: {
        fontSize: 20,
        fontWeight: '700',
        color: Colors.darkGray,
        marginBottom: 2,
    },
    title2: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.darkGray,
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: Colors.darkGray,
    },
});

export default TermsAndConditions;