import React, {useState} from "react";
import {useParams} from "react-router-dom";
import PageNotFoundPage from "../../component/ErrorPages/PageNotFound";
import {Box, Stack, Typography, useMediaQuery, IconButton} from "@mui/material";
import {useQuery} from "react-query";
import ProductsServices from "../../services/user/ProductServices";
import CartLoader from "../../component/Spinner/CartLoader";
import ProductFilter from "../../component/Drawer/ProductFilter";
import {Menu as MenuIcon, Close as CloseIcon} from "@mui/icons-material";

const ProductsList = () => {
  const {category} = useParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));

  console.log("category-----------------------", category);

  const {data, error, isLoading} = useQuery(
    ["products", category],
    () => ProductsServices.getProducts(category),
    {
      enabled: !!category,
    }
  );

  if (isLoading) return <CartLoader />;

  if (error) return <div>{error.response?.data?.error}</div>;

  console.log("productData,----------------", data);

  // if (!category) {
  //   return <PageNotFoundPage />;
  // }

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <>
      {isMobile && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleToggleDrawer}
          sx={{
            position: "fixed",
            top: 30,
            left: 16,
            zIndex: 1200,
          }}
        >
          {openDrawer ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      )}
      <Stack direction={"row"} mt={isMobile ? 8 : 0}>
        <Box width={isMobile ? "" : "20%"} p={1}>
          <ProductFilter
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
            handleToggleDrawer={handleToggleDrawer}
            isMobile={isMobile}
          />
        </Box>
        <Box width={isMobile ? "100%" : "80%"}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            voluptatum deserunt quaerat. Commodi, veniam temporibus. At ipsam
            reiciendis sit, eveniet sunt fugit. Porro harum doloribus quia esse
            voluptatum deleniti repellat distinctio ad accusantium aut.
            Praesentium magni architecto dignissimos voluptatem voluptate dolore
            suscipit repudiandae dolorum distinctio dolores iste minima harum
            iusto, sit nemo quaerat omnis maxime quia pariatur nihil repellat
            asperiores accusamus? Praesentium vitae hic ducimus accusantium
            maxime corrupti ea, dolor officia illo, nulla distinctio magnam,
            placeat ullam. Dolorem veniam vitae nam aspernatur, neque possimus
            blanditiis at fugit odit porro? Doloribus impedit fugiat aspernatur
            mollitia exercitationem ipsum qui eaque maiores perferendis
            molestiae odit nulla reiciendis sunt sint veritatis, rem beatae cum
            pariatur provident? Aperiam dolorem quasi maxime recusandae et
            distinctio? Iusto minus tenetur magni sapiente nesciunt. Optio
            possimus quisquam, fuga incidunt distinctio aliquid velit recusandae
            quis ratione, molestias eius voluptatem quaerat nihil nisi, ullam
            accusamus et laborum excepturi culpa! Cum obcaecati, ratione sit
            illum quod magni dolorem accusantium. Quisquam rem accusantium
            recusandae veritatis ex, fugit cupiditate vitae id dolorem earum
            quasi assumenda at adipisci natus voluptatem laudantium iusto, odio,
            similique vel asperiores error incidunt aliquid officiis. Qui ullam
            facere minima quod, autem maxime ipsa aliquam provident culpa
            expedita. Iure eaque velit esse ab explicabo reiciendis vero
            temporibus, ratione quibusdam maxime voluptates tempore adipisci.
            Adipisci vero eum asperiores, odio eveniet ab aspernatur.
            Asperiores, impedit unde id et aliquam dolor facilis alias atque
            nesciunt dignissimos officia eius itaque? Aliquam accusamus hic ipsa
            vel velit. Possimus optio veniam dolores distinctio saepe cum
            maxime. Laboriosam ipsum ratione tenetur necessitatibus debitis
            dolorum, ipsa, quis corporis, aliquid facere dolor molestiae sed
            placeat impedit accusantium iste. Dolorum ducimus qui alias quas
            libero nisi laudantium excepturi aliquam asperiores officia sint
            labore, magnam officiis voluptates consequatur, nesciunt tempore
            saepe quisquam natus recusandae voluptatum velit dolorem laboriosam!
            Quasi reprehenderit dicta, asperiores quas distinctio optio quisquam
            fugit laudantium assumenda accusamus aliquam, sint, illo nam labore
            deleniti! Accusantium, fuga consectetur voluptatum, natus
            repellendus non eligendi dolor similique ut qui tempora. Aliquam,
            fugiat quibusdam optio corrupti odio harum veniam nobis beatae
            reprehenderit qui. Quae ullam expedita mollitia quod deserunt
            aliquid officia numquam! Ipsa consequatur deserunt iusto, excepturi
            obcaecati, dicta vero doloremque pariatur at tempore maxime eum
            fugiat dolorem fuga odio in nihil quia doloribus animi harum id
            rerum omnis quae sapiente. Soluta, totam architecto culpa debitis
            optio aspernatur ipsa, recusandae maxime enim autem, quidem corporis
            ratione laboriosam adipisci aperiam? In veniam hic expedita nobis
            eaque est iusto quasi explicabo optio similique quos ducimus, dolor
            veritatis aliquam numquam rerum dicta nulla quod voluptas! Modi
            magnam at consequuntur cupiditate! Alias obcaecati hic sunt minima
            exercitationem facilis minus! Repellendus culpa quod possimus eos
            doloribus fugiat, soluta ipsam totam unde omnis, debitis deserunt,
            quo id dolorem. Id recusandae nobis esse perferendis. Quo earum
            delectus non reprehenderit quibusdam neque eum cupiditate nisi
            eveniet quasi illum maiores repellat, quidem cum corrupti architecto
            libero nemo iure? Debitis praesentium ullam suscipit. Eveniet
            explicabo molestiae sed, ducimus unde neque accusamus fugit quo fuga
            incidunt voluptatibus ipsa quae nesciunt doloremque ex tempore
            aspernatur provident sequi assumenda quas rerum. Praesentium quaerat
            dolores repellendus perspiciatis ad tenetur inventore laborum
            similique saepe commodi, culpa debitis neque magni possimus porro
            quia eaque natus est. Obcaecati officia fugit repellendus maxime?
            Veritatis nostrum quas sequi ea nemo numquam. Recusandae possimus,
            culpa similique officia incidunt unde perferendis distinctio enim
            quidem necessitatibus quis ipsam totam pariatur ab tempora eos
            consectetur iste beatae omnis quasi odio corrupti eligendi in.
            Nesciunt, mollitia vel consectetur cumque recusandae sapiente
            voluptatibus amet pariatur et sint sunt atque non aspernatur vero
            exercitationem dolore cupiditate tempora tempore asperiores quos,
            reiciendis repellendus. Corrupti magni cum assumenda iste laboriosam
            neque, esse voluptatibus dicta vel ullam numquam sapiente ipsam nam
            totam nihil accusamus ut commodi exercitationem amet? Voluptas odit
            labore unde eligendi. Quisquam eius ratione sint. Nisi ex ab sint
            maxime, molestias nobis consequatur vero? Harum doloremque obcaecati
            illum dolore asperiores incidunt expedita fugit debitis. Corrupti
            perspiciatis ipsum molestiae suscipit iusto repudiandae cumque qui
            nobis ipsa totam unde amet maxime doloribus officia, at vero minima
            quo reiciendis dolores accusantium dolorum veniam! Aut, optio quasi!
            Tempore nihil saepe et quaerat accusamus odio quidem ex
            reprehenderit asperiores corrupti magnam repellat, doloremque quod
            cumque ducimus praesentium atque facilis? Unde, quibusdam veniam
            ipsa eligendi numquam quasi ipsum ut odit! Beatae consequuntur
            repellendus consequatur nisi? Dicta error quod ipsa dolore. Maiores
            id, voluptatem suscipit non esse, minima in ipsam expedita magni
            quam necessitatibus hic dicta laborum nam totam! Modi, eaque
            molestiae fugit dolore tempore culpa similique placeat deserunt
            optio quibusdam et repudiandae delectus dolorum numquam,
            necessitatibus voluptatum saepe adipisci, consectetur accusantium
            quaerat recusandae aliquid debitis nihil. Voluptatibus, totam, rem
            non suscipit eligendi iusto, ut asperiores placeat soluta culpa
            itaque aut magni consequatur sit pariatur saepe enim mollitia fugit
            voluptate provident corporis minus quasi numquam quidem! Ipsum nisi
            tenetur, voluptatem error perspiciatis repellat maxime impedit
            consectetur officiis sed exercitationem eveniet cum pariatur
            excepturi voluptatum enim. Fugiat cum veritatis soluta modi placeat
            sapiente! Ipsam suscipit maxime laborum vero, accusantium quam sequi
            aliquid ipsum debitis minima qui sapiente. Suscipit ex odio fugit
            numquam? Molestiae illo pariatur placeat amet nam, vero ratione
            nemo, praesentium optio eaque ut doloribus iure, explicabo
            consequatur ipsa facilis repudiandae deleniti sequi iusto qui soluta
            rem! Itaque, sit eaque laboriosam eum eligendi exercitationem autem,
            iure beatae ex ab voluptatibus architecto nihil corrupti commodi
            quis harum accusantium. Explicabo perferendis vel officiis
            accusantium quisquam consequatur, numquam autem commodi ratione
            dolorum repellat distinctio fugiat ullam pariatur, neque,
            perspiciatis aliquam! Quia possimus ducimus quam vero, placeat esse
            autem, ad fugit atque distinctio dolorem enim iste mollitia est
            assumenda quod impedit ratione eligendi animi qui itaque et!
            Blanditiis, unde tempore vero vitae iste suscipit voluptatibus,
            accusantium ad, incidunt saepe officiis cupiditate consequatur
            provident. Suscipit, facilis! Beatae eos blanditiis dolorum deleniti
            dignissimos perferendis? Iure, dolorum. Illo iste dolores eaque amet
            eveniet, ad harum? Facilis voluptatem temporibus perferendis
            architecto officia nam, suscipit nesciunt blanditiis laborum
            accusamus in qui obcaecati soluta possimus incidunt tempore fuga
            nulla, ut molestias cumque doloremque aperiam. Nemo voluptas sit aut
            mollitia, quo dolorum dolorem illo laudantium optio, error nisi!
            Iste!
          </p>
        </Box>
      </Stack>
    </>
  );
};
export default ProductsList;
