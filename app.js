const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Configurações para parecer mais com um navegador real (evitar proteção de sites)
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });
  
  try {
    // Abre a página do Indeed
    await page.goto('https://br.indeed.com/', { waitUntil: 'networkidle2' });
  
    // Aguarda até que um seletor específico esteja disponível na página
    
    // Preenche o campo de busca com "Analista"
    await page.type('#text-input-what', 'Analista');
    
    // Clica no botão de pesquisa
    await page.click('.yosegi-InlineWhatWhere-primaryButton');
    await page.waitForSelector('#gnav-footer-container');
    
    // Captura o conteúdo HTML da página
    const content = await page.content();
    
    // Agora você pode fazer o que quiser com o conteúdo, como armazená-lo em uma variável ou escrevê-lo em um arquivo
   
    // Escreve o conteúdo HTML em um arquivo PDF
    await page.pdf({ path: 'resultado.pdf', format: 'A4' });   
    
  } catch (error) {
    console.error('Erro ao realizar a pesquisa:', error);
  } finally {
    await browser.close();
  }
})();