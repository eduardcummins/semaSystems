import type { Dict } from "./types";

// Spanish (Spain), formal "usted". Mirrors en.ts key for key; written to read naturally, not translated word for word.
export const es: Dict = {
  meta: {
    title: "Sema Systems: agentes que puede ver trabajar",
    description:
      "Agentes de IA a medida para asesorías, aseguradoras y equipos pequeños. Creados con nuestro propio software y entregados como un flujo que su equipo puede leer y gestionar.",
    ogLocale: "es_ES",
  },
  nav: {
    label: "Principal",
    how: "Cómo funciona",
    examples: "Ejemplos",
    faq: "Preguntas",
    book: "Reserve una llamada",
    menu: "Menú",
    close: "Cerrar menú",
    home: "Inicio de Sema Systems",
    language: "English",
  },
  hero: {
    title: "Agentes que puede ver trabajar.",
    sub: "Cuéntenos una tarea como se la explicaría a un compañero. Creamos un agente de IA que la hace dentro de las herramientas que ya utiliza y se lo entregamos como un flujo visual, para que su equipo vea cada paso y mantenga el control.",
    audience: "Para asesorías, aseguradoras y equipos pequeños.",
    primary: "Reserve una llamada gratuita",
    secondary: "Envíenos una tarea",
    visual: {
      label: "Ejemplo: un agente llamado Registro de facturas, en cuatro pasos. El último espera a que usted lo apruebe.",
      agent: "Registro de facturas",
      view: "Flujo",
      status: "En marcha",
      steps: ["Llega una factura nueva", "Lee la factura", "La añade a su hoja", "Usted la aprueba"],
      log: "Hoy · 6 facturas procesadas · 1 pendiente de usted",
      caption: "Esto es lo que recibe: cada agente como un flujo que puede ver trabajar, paso a paso.",
    },
  },
  how: {
    heading: "Cómo funciona",
    steps: [
      {
        title: "Su forma de trabajar",
        text: "Nos explica con sus propias palabras cómo se hace hoy el trabajo: por dónde entra, quién interviene y dónde se va el tiempo.",
      },
      {
        title: "El diseño",
        text: "Lo dibujamos como un flujo visual y acordamos qué merece la pena automatizar, qué conviene dejar como está y en qué punto debe revisarlo una persona.",
      },
      {
        title: "La construcción",
        text: "Construimos el agente con nuestro propio software y lo conectamos a las herramientas que ya utiliza.",
        points: [
          { lead: "Reglas fijas.", text: "Los cálculos, las comprobaciones y el reparto del trabajo siguen reglas fijas, así que el resultado no varía." },
          { lead: "IA donde aporta.", text: "Leer un documento o redactar una respuesta. Cada decisión queda anotada en el registro." },
          { lead: "Usted da el visto bueno.", text: "Nada sale de la empresa sin la aprobación de una persona, salvo que usted decida lo contrario." },
        ],
      },
      {
        title: "Su equipo",
        text: "Se lo entregamos de forma que su equipo lo entienda y pueda gestionarlo.",
        points: [
          { lead: "La vista del flujo.", text: "Cada paso, qué entra y qué sale." },
          { lead: "Notas en lenguaje claro.", text: "Qué hace cada paso y qué hacer si se detiene." },
          { lead: "Un registro de ejecuciones.", text: "Cada ejecución queda registrada, para que pueda comprobar cualquier resultado." },
        ],
      },
    ],
  },
  examples: {
    heading: "Flujos de ejemplo",
    sub: "Seis tareas que un agente podría quitarle de encima, cada una tal y como vería su flujo.",
    illustrative: "Ilustrativo",
    tabsLabel: "Elija un ejemplo",
    problem: "El problema",
    does: "El flujo",
    check: "Lo revisa usted",
    before: "Antes",
    after: "Después",
    items: {
      invoices: {
        tab: "Facturas",
        problem: "Las facturas de proveedores llegan por correo y alguien las vuelve a teclear, una a una, en una hoja de cálculo.",
        steps: ["Detecta una factura nueva en el correo", "Lee el proveedor, la fecha y el importe", "Añade una fila a su hoja", "Usted revisa las filas nuevas"],
        before: "Unas dos horas tecleando 30 facturas.",
        after: "Las filas se añaden solas. Revisarlas lleva dos minutos.",
      },
      inbox: {
        tab: "Consultas",
        problem: "Las consultas se acumulan en un buzón compartido y las respuestas salen tarde.",
        steps: ["Lee cada consulta nueva", "La clasifica: presupuesto, soporte u otra", "Redacta una respuesta con su estilo", "Usted aprueba la respuesta", "La envía desde su dirección"],
        before: "De cinco a diez minutos por consulta.",
        after: "Un borrador listo para cada una. Usted lo aprueba.",
      },
      chasing: {
        tab: "Asesoría",
        problem: "Los clientes envían la documentación tarde y alguien pierde una tarde reclamándola.",
        steps: ["Lee cada documento que envía un cliente", "Lo compara con lo que aún falta", "Redacta un recordatorio con lo pendiente", "Usted aprueba cada recordatorio"],
        before: "Una tarde reclamando documentos a 20 clientes.",
        after: "Recordatorios redactados. Usted aprueba cada uno.",
      },
      contracts: {
        tab: "Revisión de seguros",
        problem: "Cada contrato nuevo necesita una primera lectura atenta antes de que nadie pueda actuar.",
        steps: ["Lee el contrato completo", "Extrae las condiciones clave", "Señala las cláusulas que conviene revisar", "Usted decide sobre cada aviso"],
        before: "Una hora o más para una primera lectura.",
        after: "Una primera revisión en minutos. La última palabra es suya.",
      },
      submission: {
        tab: "Corredores",
        problem: "Las solicitudes de los corredores llegan en correos con adjuntos, y cada una se teclea a mano.",
        steps: ["Abre el correo y sus adjuntos", "Extrae los datos del riesgo", "Prepara la solicitud y señala lo que falta", "Usted la revisa antes de seguir"],
        before: "De veinte a cuarenta minutos tecleando cada una.",
        after: "Un borrador ordenado, con lo que falta señalado. Usted lo revisa.",
      },
      briefing: {
        tab: "Resumen de prensa",
        problem: "Alguien dedica la primera hora de cada día a leer las noticias sobre sus clientes.",
        steps: ["Recoge la cobertura de la noche sobre sus temas", "Se queda solo con lo relevante", "Redacta un resumen de una página con fuentes", "Usted le da el visto bueno"],
        before: "Una hora de lectura cada mañana.",
        after: "Un resumen de una página listo al llegar.",
      },
    },
  },
  faq: {
    heading: "Preguntas frecuentes",
    items: [
      {
        q: "¿Dependeremos de ustedes para que siga funcionando?",
        a: "No, y esa es la idea. Todo lo que construimos está pensado para que su equipo lo entienda: recibe la vista del flujo, notas en lenguaje claro sobre cada paso y una sesión de traspaso. Seguimos a su disposición cuando quiera cambios, un flujo nuevo o una segunda opinión.",
      },
      {
        q: "¿Sustituyen nuestro software actual?",
        a: "No. Nuestro objetivo es automatizar los flujos que ya tiene, dentro de las herramientas que ya utiliza: correo, hojas de cálculo, Sage, Xero, su CRM. Si de verdad creemos que una herramienta está frenando un flujo, se lo diremos y le explicaremos por qué, pero sustituir su software no es el objetivo.",
      },
      {
        q: "¿Qué es, en la práctica, un agente de IA?",
        a: "Un programa que realiza una tarea paso a paso, como lo haría una persona. La mayoría de los pasos siguen reglas fijas. La IA solo se usa donde hace falta criterio, como al leer un documento o redactar una respuesta.",
      },
      {
        q: "¿Y si se equivoca?",
        a: "Cada ejecución queda registrada y los pasos importantes esperan a una persona. Si algo no cuadra, puede ver exactamente qué hizo cada paso y con qué información trabajó.",
      },
      {
        q: "¿Están seguros nuestros datos?",
        a: "El agente funciona en sus propias cuentas, solo con el acceso que necesita la tarea. Sus datos se usan para ejecutar su flujo y para nada más. Trabajamos teniendo en cuenta el RGPD y acordamos con usted cómo se tratan sus datos antes de empezar.",
      },
      {
        q: "¿Cuánto se tarda en tener el primer flujo?",
        a: null, // TODO(Ed): confirmar un plazo habitual y sustituir null por la respuesta.
      },
      {
        q: "¿Cuánto cuesta?",
        a: "Cada proyecto se presupuesta según el flujo. Tras una llamada gratuita le enviamos un presupuesto por escrito, antes de empezar ningún trabajo.",
      },
      {
        q: "¿Qué necesitan de nosotros para empezar?",
        a: "Una llamada de 30 minutos y una tarea que le quite tiempo a su equipo.",
      },
      {
        q: "¿Trabajan en español?",
        a: "Sí. Trabajamos en inglés, español y catalán.",
      },
    ],
  },
  closing: {
    title: "Envíenos una tarea que le robe la semana.",
    sub: "Le mostraremos cómo la haría un agente.",
    email: "O escríbanos a",
  },
  contact: {
    heading: "Envíenos una tarea",
    email: "Su correo electrónico",
    task: "¿Qué tarea le quita más tiempo?",
    optional: "opcional",
    send: "Enviar",
    sending: "Enviando...",
    success: "Gracias. Hemos recibido su mensaje y le responderemos pronto.",
    error: "Algo ha fallado. Inténtelo de nuevo o escríbanos por correo.",
    consentBefore: "Solo usaremos sus datos para responderle. Consulte nuestra ",
    consentLink: "política de privacidad",
    consentAfter: ".",
  },
  footer: {
    privacy: "Política de privacidad",
    label: "Pie de página",
    legalLine:
      "Sema Systems es el nombre comercial de Innovation Partners Ltd. Sociedad registrada en Inglaterra y Gales con el número 04369538. Domicilio social: 3 Athenaeum Road, Londres, N20 9AA.",
    rights: "Sema Systems",
  },
  placeholder: {
    privacyTitle: "Política de privacidad",
    text: "Esta página es provisional y se redactará por separado.",
    back: "Volver al inicio",
  },
};
