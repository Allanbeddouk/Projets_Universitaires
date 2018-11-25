/*
 * According to: Travaux Pratiques dans le cous INF2010 coordonnés par Tarek OULD-BACHIR
 *
 * @authors Tarek Ould Bachir, Wail Khemir
 * @created: 2015-09-06
 */

public class Main 
{
	/**
	 * Fonction principale
	 * @param args (non utilise)
	 */
	public static void main(String[] args) 
	{
		/**
		 * Exercice 1
		 */
		
		PixelMap pmc = new PixelMap("./ed.ppm");
		PixelMap pmg = pmc.toGrayImage();
		PixelMap pmb = pmc.toBWImage();
		
		PixelMap pmt = pmc.toTransparentImage();
		for(int i = 0; i < pmt.height; ++i)
			for(int j = 0; j < pmt.width; ++j)
				pmt.getPixel(i, j).setAlpha(127);
		
		String wName = "Edsger Dijkstra (original)";
		new DisplayImageWindow(wName, pmc, 50, 50);
		
		wName = "Edsger Dijkstra (gris)";
		new DisplayImageWindow(wName, pmg, 50+50, 50+50);
		
		wName = "Edsger Dijkstra (B&W)";
		new DisplayImageWindow(wName, pmb, 50+100, 50+100);
		
		wName = "Edsger Dijkstra (Transparent)";
		new DisplayImageWindow(wName, pmt, 200, 200);
		
		/**
		 * Exercice 2
		 */
		
		PixelMapPlus pmp = new PixelMapPlus("./ed.ppm");
		
		PixelMapPlus hpmp = new PixelMapPlus( pmp );
		
		hpmp.resize(hpmp.width/2, hpmp.height/2);
		
		PixelMapPlus gpmp = new PixelMapPlus( pmp );
		
		gpmp.resize(gpmp.width/2, gpmp.height/2);
		gpmp.convertToGrayImage();
		
		PixelMapPlus bwpmp = new PixelMapPlus( pmp );
		
		bwpmp.resize(bwpmp.width/2, bwpmp.height/2);
		bwpmp.convertToBWImage();
		
		PixelMapPlus npmp = new PixelMapPlus( pmp );
		
		npmp.resize(npmp.width/2, npmp.height/2);
		npmp.negate();
		
		pmp.insert(hpmp, 0, 0);
		pmp.insert(gpmp, pmp.getHeight()/2, 0);
		pmp.insert(bwpmp, 0, pmp.getWidth()/2);
		pmp.insert(npmp, pmp.getHeight()/2, pmp.getWidth()/2);
		
		wName = "Edsger Dijkstra";
		new DisplayImageWindow(wName, pmp);
		
	}
}
